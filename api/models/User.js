module.exports.model = [
  "UID",
  "EMAIL",
  "VERIFIED",
  "PASSWORD",
  "NAME",
  "ROLE",
  "REGISTERED",
  "LAST_LOGIN"
];

module.exports.recordMap = function (row) {
  return {
    uid: row[0],
    email: row[1],
    verified: row[2],
    password: row[3],
    name: row[4],
    role: row[5],
    registered: row[6],
    lastLogin: row[7]
  }
}