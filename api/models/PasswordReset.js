module.exports.model = [
  "HASH",
  "UID",
  "CREATED"
];

module.exports.recordMap = function (row) {
  return {
    hash: row[0],
    uid: row[1],
    created: row[2]
  }
}