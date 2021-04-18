const sqlstring = require("sqlstring");
const { getDate } = require("../utilities/date");
const { client } = require("../database/connection");
const { getTableName: getTableNameForCSV } = require("../database/csvModels");
const { TABLE, MODEL, RECORD_MAP } = require("../database/tables");
const { convertDataToCSV } = require("./csvExporter");

// TODO: HILLSBOROUGH_CLERK_CIVIL is hardcoded, change method if using various datasets

/**
 * Loan Number record map for PPP LOAN SEARCH Table
 */
var caseNumberMap = function createMap(row) {
  return {
    CaseNumber: row[2]
  }
};

/**
 * Build query from filters
 */
function buildFLClerkQuery(tableName, {county, case_type, case_number, case_title, party_name, attorney_name, party_type, date, party_address}) {
  var filingDate = date;

  // Build query
  var dbQuery = `SELECT DISTINCT CASE_NUMBER from ${tableName} WHERE 1=1 `;

  if(county != "All Counties") {
      dbQuery += " AND COUNTY = " + sqlstring.escape(county);
  }
  if (case_type != "All Case Types") {1
      dbQuery += " AND CASE_TYPE_DESCRIPTION = " + sqlstring.escape(case_type);
  }
  if (case_number != "") {
      dbQuery += ` AND CASE_NUMBER REGEXP ${sqlstring.escape(case_number)}`;
  }
  if (case_title != "") {
      dbQuery += ` AND TITLE REGEXP ${sqlstring.escape(case_title)}`;
  }
  if (party_name != "") {
      dbQuery += ` AND FULL_PARTY_NAME REGEXP ${sqlstring.escape(party_name)}`;
  }
  if (attorney_name != "") {
      dbQuery += ` AND ATTORNEY REGEXP ${sqlstring.escape(attorney_name)}`;
  }
  if (party_type != "All Party Types") {
      dbQuery += ` AND PARTY_TYPE REGEXP ${sqlstring.escape(party_type)}`;
  }
  if (filingDate.from !== "") {
    dbQuery += " AND DATE(FILING_DATE) >= " + sqlstring.escape(filingDate.from);
  }
  if (filingDate.to !== "") {
    dbQuery += " AND DATE(FILING_DATE) <= " + sqlstring.escape(filingDate.to);
  }
  if(party_address != "") {
      dbQuery += " AND PARTY_ADDRESS = " + sqlstring.escape(party_address);
  }

  return dbQuery;
}

/**
 * Get records from Sunshine Analytics table given list of Loan Numbers
 *
 * @param caseNumberArray
 * @param mapRecord - Record object map for PPP LOAN data
 * @returns List of Records
 */
function getRecords(caseNumberArray, mapRecord) {
  var query = `SELECT * from ${TABLE.HILLSBOROUGH_CLERK_CIVIL} where CASE_NUMBER in (${sqlstring.escape(caseNumberArray)})`;
  console.log(caseNumberArray)
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
  var query = buildFLClerkQuery(TABLE.HILLSBOROUGH_CLERK_CIVIL, filters);
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
      table.insert(MODEL.FILE_REQUEST_HISTORY).values(fileId, userId, getDate(), count, "HILLSBOROUGH_CLERK_CIVIL", JSON.stringify(filters)).execute().then(() => {
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
    getSearchRecords(filters, caseNumberMap).then(entries => {
      // Create array of loan numbers
      var caseNums = [];
      for (var i = 0; i < entries.length; i++) {
        console.log(`case_num_test:` + entries[i].CaseNumber)
        caseNums.push(entries[i].CaseNumber);
      }



      // Get PPP_LOAN table record map for CSV export
      var { mapRecord } = getTableNameForCSV(TABLE.HILLSBOROUGH_CLERK_CIVIL);

      // Get loan data
      getRecords(caseNums, mapRecord).then(records => {
        resolve({
          size: caseNums.length,
          csv: convertDataToCSV(TABLE.HILLSBOROUGH_CLERK_CIVIL, records)
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
  getNumberOfRecords(filters, caseNumberMap).then((numEntries) => {
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
    var { mapRecord } = getTableNameForCSV(TABLE.HILLSBOROUGH_CLERK_CIVIL);
    var query = `SELECT * from ${TABLE.HILLSBOROUGH_CLERK_CIVIL} LIMIT 10`;

    var entries = await client.querySelect(query, mapRecord);

    // Build CSV
    var csv = convertDataToCSV(TABLE.HILLSBOROUGH_CLERK_CIVIL, entries);

    // Set response header to indicate CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${TABLE.HILLSBOROUGH_CLERK_CIVIL}.csv`);
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
    res.setHeader("Content-Disposition", `attachment; filename=${TABLE.HILLSBOROUGH_CLERK_CIVIL}.csv`);
    return res.status(200).send(csv);

  } catch (err) {
    console.log("Error creating CSV for history request: ", filters, err);
    return res.status(500).send({ msg: "Unable to retrieve CSV file." });
  }

}
exports.getFileForDownload = getFileForDownload;
