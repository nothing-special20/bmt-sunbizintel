module.exports.model = [
  "CASE_CATEGORY"
  ,"CASE_TYPE_DESCRIPTION"
  ,"CASE_NUMBER"
  ,"TITLE"
  ,"FILING_DATE"
  ,"PARTY_TYPE"
  ,"FIRST_NAME"
  ,"MIDDLE_NAME"
  ,"LAST_NAME_COMPANY_NAME"
  ,"PARTY_ADDRESS"
  ,"ATTORNEY"
  ,"COUNTY"
  ,"FULL_PARTY_NAME"
];

/**
 * Model for exporting data as CSV
 */
module.exports.csvModel = [
  "CaseCategory"
  ,"CaseTypeDescription"
  ,"CaseNumber"
  ,"Title"
  ,"FilingDate"
  ,"PartyType"
  ,"FirstName"
  ,"MiddleName"
  ,"LastNameCompanyName"
  ,"PartyAddress"
  ,"Attorney"
  ,"County"
  ,"FullPartyName"
];

/**
 * Create map for PPP loan record row
 * @param row
 * @returns PPP Loan Data Map
 */
exports.recordMap = function (row) {
  return {
    CaseCategory: row[0],
    CaseTypeDescription: row[1],
    CaseNumber: row[2],
    Title: row[3],
    FilingDate: row[4],
    PartyType: row[5],
    FirstName: row[6],
    MiddleName: row[7],
    LastNameCompanyName: row[8],
    PartyAddress: row[9],
    Attorney: row[10],
    County: row[11],
    FullPartyName: row[12]
  }
}

/**
 * Create map for PPP loan record row for CSV export
 * @param row
 * @returns PPP Loan Data Map
 */
exports.csvRecordMap = function (row) {
  return {
    CaseCategory: row[0],
    CaseTypeDescription: row[1],
    CaseNumber: row[2],
    Title: row[3],
    FilingDate: row[4],
    PartyType: row[5],
    FirstName: row[6],
    MiddleName: row[7],
    LastNameCompanyName: row[8],
    PartyAddress: row[9],
    Attorney: row[10],
    County: row[11],
    FullPartyName: row[12]
  }
}
