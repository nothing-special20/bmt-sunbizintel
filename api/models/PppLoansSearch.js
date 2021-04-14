module.exports.model = [
  "LOAN_NUMBER",
  "STATE",
  "ZIP",
  "LOAN_DATE",
  "NAICSCODE",
  "LOAN_AMOUNT",
  "JOBS",
  "CREATED"
];

module.exports.recordMap = function (row) {
  return {
    loanNumber: row[0],
    state: row[1],
    zip: row[2],
    loanDate: row[3],
    naicsCode: row[4],
    loanAmount: row[5],
    jobs: row[6],
    created: row[7]
  }
}
