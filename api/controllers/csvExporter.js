const { Parser } = require('json2csv')
const { client } = require("../database/connection");
const { getTableName , getModel } = require("../database/csvModels");

/**
 * Lookup record in Table <type> filtering on county for CSV export
 *
 * @param type
 * @param county
 * @returns Records data
 */
function getRecords(type, county) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      // Get table name and row mapping function
      var { tableName, mapRecord } = getTableName(type);
      // Get table
      var table = schema.getTable(tableName);

      var results = [];
      table.select(getModel(type)).where("COUNTY = :param").bind("param", county).execute(row => {
        // Create object map for row
        results.push(mapRecord(row));
      }).then(() => {
        resolve(results);
      }).catch(err => {
        console.log(`Error retrieving (${type}) for (${county}).`, err);
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Get subscription data CSV file
 */
async function downloadSubscriptionData(req, res) {
  // Get data for subscription
  getRecords(req.query.type, req.query.county).then(cases => {
    // Create CSV data
    const csvFields = getModel(req.query.type);
    const csvParser = new Parser({ csvFields });
    const csvData = csvParser.parse(cases);

    // Set response header to indicate CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${req.query.type}-${req.query.county}.csv`);

    // Send data
    return res.status(200).send(csvData);
  }).catch(err => {
    console.log(`Error retrieving file for COUNTY (${req.query.county}) TYPE (${req.query.type}).`, err);
    return res.status(500).send({ msg: "Could not retrieve data." });
  });
}
exports.downloadSubscriptionData = downloadSubscriptionData;

/**
 * Convert data to CSV
 */
function convertDataToCSV(tableName, data) {
  // Create CSV data
  const csvFields = getModel(tableName);
  const csvParser = new Parser({ csvFields });
  const csvData = csvParser.parse(data);
  return csvData;
}
exports.convertDataToCSV = convertDataToCSV;
