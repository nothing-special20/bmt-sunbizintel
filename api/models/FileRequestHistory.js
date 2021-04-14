module.exports.model = [
  "FILE_ID",
  "USER_ID",
  "REQUEST_DATE",
  "RECORD_COUNT",
  "DATA_TYPE",
  "PARAMETERS"
];

module.exports.recordMap = function (row) {
  return {
    fileId: row[0],
    userId: row[1],
    requestDate: row[2],
    recordCount: row[3],
    dataType: row[4],
    parameters: row[5]
  }
}