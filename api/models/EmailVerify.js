module.exports.model = [
  "VERIFICATION_HASH",
  "UID",
  "CREATED"
];

module.exports.recordMap = function (row) {
  return {
    verificationHash: row[0],
    uid: row[1],
    created: row[2]
  }
}