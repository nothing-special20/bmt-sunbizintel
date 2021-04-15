const sqlstring = require("sqlstring");
const { getDate } = require("../utilities/date");
const { client } = require("../database/connection");
const { getTableName: getTableNameForCSV } = require("../database/csvModels");
const { TABLE, MODEL, RECORD_MAP } = require("../database/tables");
const { convertDataToCSV } = require("./csvExporter");

// TODO: PPP_LOANS is hardcoded, change method if using various datasets

/**
 * Loan Number record map for PPP LOAN SEARCH Table
 */
var loanNumberMap = function createMap(row) {
  return {
    LoanNumber: row[0]
  }
};

/**
 * Build query from filters
 */
function buildQuery(tableName, {naics, state, zip, date, jobsReported , amount}) {
  var loanDate = date;
  var jobs = jobsReported; // JSON.parse(jobsReported);
  var loanAmount = amount; //JSON.parse(amount);

  // Build query
  var dbQuery = `SELECT LOAN_NUMBER from ${tableName} WHERE 1=1 `;

  if(naics != "") {
      dbQuery += " AND NAICS_CODE = " + sqlstring.escape(naics);
  }
  if (state != "") {
      dbQuery += " AND STATE = " + sqlstring.escape(state);
  }
  if (zip != "") {
      dbQuery += ` AND ZIP like ${sqlstring.escape("%" + zip + "%")}`;
  }
  if (loanDate.from !== "") {
    dbQuery += " AND DATE(LOAN_DATE) >= " + sqlstring.escape(loanDate.from);
  }
  if (loanDate.to !== "") {
    dbQuery += " AND DATE(LOAN_DATE) <= " + sqlstring.escape(loanDate.to);
  }
  if (jobs.min != "") {
      dbQuery += " AND JOBS >= " + sqlstring.escape(jobs.min);
  }
  if (jobs.max != "") {
      dbQuery += " AND JOBS <= " + sqlstring.escape(jobs.max);
  }
  if (loanAmount.min !== "") {
    dbQuery += " AND LOAN_AMOUNT >= " + sqlstring.escape(loanAmount.min);
  }
  if (loanAmount.max !== "") {
    dbQuery += " AND LOAN_AMOUNT <= " + sqlstring.escape(loanAmount.max);
  }
  return dbQuery;
}

/**
 * Get records from Sunshine Analytics table given list of Loan Numbers
 *
 * @param loanNumberArray
 * @param mapRecord - Record object map for PPP LOAN data
 * @returns List of Records
 */
function getRecords(loanNumberArray, mapRecord) {
  var query = `SELECT * from ${TABLE.PPP_LOANS} where LoanNumber in (${sqlstring.escape(loanNumberArray)})`;
  return new Promise((resolve, reject) => {
    client.querySelect(query, mapRecord).then(result => {
      resolve(result);
    }).catch(err => {
      reject("Error getting records.", err);
    });
  });
}

/**
 * Get records for file request query
 *
 * @param filters
 * @returns Records for query
 */
function getSearchRecords(filters, mapRecord) {
  // Get Table Name and map

  // Build query
  var query = buildQuery(TABLE.PPP_LOANS_SEARCH, filters);
  return new Promise((resolve, reject) => {
    client.querySelect(query, mapRecord).then(result => {
      resolve(result);
    }).catch(err => {
      reject("Error getting search records.", err);
    });
  });
}

/**
 * Lookup record count for file request query
 *
 * @param filters
 * @returns Number of records for query
 */
function getNumberOfRecords(filters, mapRecord) {
  return new Promise((resolve, reject) => {
    getSearchRecords(filters, mapRecord).then(result => {
      resolve(result.length);
    }).catch(err => {
      reject("Error getting number of records.", err);
    });
  });
}

/**
 * Add file request to user history
 *
 * @param filters
 * @param user
 * @param count - Record Count
 */
function addRequestToUserHistory(fileId, filters, userId, count) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.FILE_REQUEST_HISTORY);
      // Insert values
      table.insert(MODEL.FILE_REQUEST_HISTORY).values(fileId, userId, getDate(), count, "PPP_LOANS", JSON.stringify(filters)).execute().then(() => {
        resolve();
      }).catch(err => {
        reject({ 
          msg: `Could not add file to request history in database for user ${userId} and parameters: ${filters}.`,
          err: err
        });
      });

    }).catch(err => { reject(err); });
  });
}

/**
 * Query database for user's file request history
 *
 * @param userId
 * @returns List of results
 */
function getHistory(userId) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
    var mapRecord = RECORD_MAP.FILE_REQUEST_HISTORY;

      var results = [];
      var table = schema.getTable(TABLE.FILE_REQUEST_HISTORY);
      table.select().where("USER_ID = :param").bind("param", userId).execute(row => {
        results.push(mapRecord(row));
      }).then(() => {
        resolve(results);
      }).catch(err => { reject(err); });
    }).catch( err => { reject(err); });
  });
}

/**
 * Get CSV data of records
 *
 * @param filters
 * @returns CSV data
 */
function getRecordsAsCSV(filters) {
  return new Promise((resolve, reject) => {
    // Get loan IDs from search table
    getSearchRecords(filters, loanNumberMap).then(entries => {
      // Create array of loan numbers
      var loanIDs = [];
      for (var i = 0; i < entries.length; i++) {
        loanIDs.push(entries[i].LoanNumber);
      }

      // Get PPP_LOAN table record map for CSV export
      var { mapRecord } = getTableNameForCSV(TABLE.PPP_LOANS);

      // Get loan data
      getRecords(loanIDs, mapRecord).then(records => {
        resolve({
          size: loanIDs.length,
          csv: convertDataToCSV(TABLE.PPP_LOANS, records)
        });
      }).catch(err => { reject(err) });
    }).catch(err => { reject(err) });
  });
}

/**
 * Get preliminary information for file request
 */
async function getFileData(httpQuery, res) {

  // De-stringify nested JSON
  const filters = JSON.parse(httpQuery.filters);

  // Get record count
  getNumberOfRecords(filters, loanNumberMap).then((numEntries) => {
    console.log("Result:", numEntries);
    var price = 0;

    // Get price
    price = numEntries * 0.01;

    // Respond
    return res.status(200).send({
      entries: numEntries,
      price: price
    });
  }).catch(err => {
    console.log("Error retrieving file information for query: ", filters, err);
    return res.status(500).send({ msg: "Unable to retrieve information for request." });
  });
}
exports.getFileData = getFileData;

/**
 * Get sample CSV
 */
async function getSampleFile(res) {

  try {
    var { mapRecord } = getTableNameForCSV(TABLE.PPP_LOANS);
    var query = `SELECT * from ${TABLE.PPP_LOANS} LIMIT 10`;

    var entries = await client.querySelect(query, mapRecord);

    // Build CSV
    var csv = convertDataToCSV(TABLE.PPP_LOANS, entries);

    // Set response header to indicate CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${TABLE.PPP_LOANS}.csv`);
    return res.status(200).send(csv);

  } catch (err) {
    console.log("Error creating sample CSV.", err);
    return res.status(500).send({ msg: "Unable to retrieve sample CSV." });
  }
}
exports.getSampleFile = getSampleFile;

/**
 * Insert file request to user history
 */
async function insertPurchasedFile(fileId, userId, filters, size) {
  try {
    await addRequestToUserHistory(fileId, filters, userId, size);
  } catch (err) {
    throw Error(err);
  }
}
exports.insertPurchasedFile = insertPurchasedFile;


/**
 * Get User's file request history
 */
async function getUserFileRequestHistory(user, res) {
  try {
    var history = await getHistory(user.uid);
    return res.status(200).send(history);
  } catch (err) {
    console.log(`Unable to get file request history for user ${user.uid}.`, err);
    return res.status(500).send({ msg: "Unable to find history." });
  }
}
exports.getUserFileRequestHistory = getUserFileRequestHistory;

/**
 * Get file request for download from user history
 */
async function getFileForDownload(httpQuery, res) {
  // Parse filters from query
  let filters = JSON.parse(httpQuery.specifications);

  // If 'TO' date is not set, set it to date of request
  if (filters.date.to === undefined || filters.date.to === "") {
    filters.date.to = httpQuery.requestDate;
  }

  try {
    // Build CSV
    var { csv } = await getRecordsAsCSV(filters);

    // Set response header to indicate CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${TABLE.PPP_LOANS}.csv`);
    return res.status(200).send(csv);

  } catch (err) {
    console.log("Error creating CSV for history request: ", filters, err);
    return res.status(500).send({ msg: "Unable to retrieve CSV file." });
  }

}
exports.getFileForDownload = getFileForDownload;
