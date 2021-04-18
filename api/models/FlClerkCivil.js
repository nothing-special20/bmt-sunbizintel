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
    caseCategory: row[0],
    caseTypeDescription: row[1],
    caseNumber: row[2],
    title: row[3],
    filingDate: row[4],
    partyType: row[5],
    firstName: row[6],
    middleName: row[7],
    lastNameCompanyName: row[8],
    partyAddress: row[9],
    attorney: row[10],
    county: row[11],
    fullPartyName: row[12]
  }
}

/**
 * Create map for PPP loan record row for CSV export
 * @param row
 * @returns PPP Loan Data Map
 */
exports.csvRecordMap = function (row) {
  return {
    caseCategory: row[0],
    caseTypeDescription: row[1],
    caseNumber: row[2],
    title: row[3],
    filingDate: row[4],
    partyType: row[5],
    firstName: row[6],
    middleName: row[7],
    lastNameCompanyName: row[8],
    partyAddress: row[9],
    attorney: row[10],
    county: row[11],
    fullPartyName: row[12]
  }
}
