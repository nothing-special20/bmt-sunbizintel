module.exports.model = [
  "LOANNUMBER"
  ,"DATEAPPROVED"
  ,"SBAOFFICECODE"
  ,"PROCESSINGMETHOD"
  ,"BORROWERNAME"
  ,"BORROWERADDRESS"
  ,"BORROWERCITY"
  ,"BORROWERSTATE"
  ,"BORROWERZIP"
  ,"LOANSTATUSDATE"
  ,"LOANSTATUS"
  ,"TERM"
  ,"SBAGUARANTYPERCENTAGE"
  ,"INITIALAPPROVALAMOUNT"
  ,"CURRENTAPPROVALAMOUNT"
  ,"UNDISBURSEDAMOUNT"
  ,"FRANCHISENAME"
  ,"SERVICINGLENDERLOCATIONID"
  ,"SERVICINGLENDERNAME"
  ,"SERVICINGLENDERADDRESS"
  ,"SERVICINGLENDERCITY"
  ,"SERVICINGLENDERSTATE"
  ,"SERVICINGLENDERZIP"
  ,"RURALURBANINDICATOR"
  ,"HUBZONEINDICATOR"
  ,"LMIINDICATOR"
  ,"BUSINESSAGEDESCRIPTION"
  ,"PROJECTCITY"
  ,"PROJECTCOUNTYNAME"
  ,"PROJECTSTATE"
  ,"PROJECTZIP"
  ,"CD"
  ,"JOBSREPORTED"
  ,"NAICSCODE"
  ,"RACEETHNICITY"
  ,"UTILITIES_PROCEED"
  ,"PAYROLL_PROCEED"
  ,"MORTGAGE_INTEREST_PROCEED"
  ,"RENT_PROCEED"
  ,"REFINANCE_EIDL_PROCEED"
  ,"HEALTH_CARE_PROCEED"
  ,"DEBT_INTEREST_PROCEED"
  ,"BUSINESSTYPE"
  ,"ORIGINATINGLENDERLOCATIONID"
  ,"ORIGINATINGLENDER"
  ,"ORIGINATINGLENDERCITY"
  ,"ORIGINATINGLENDERSTATE"
  ,"GENDER"
  ,"VETERAN"
  ,"NONPROFIT"
];

/**
 * Model for exporting data as CSV
 */
module.exports.csvModel = [
  "LoanNumber"
  ,"DateApproved" 
  ,"SBAOfficeCode"
  ,"ProcessingMethod"
  ,"BorrowerName"
  ,"BorrowerAddress"
  ,"BorrowerCity"
  ,"BorrowerState"
  ,"BorrowerZip"
  ,"LoanStatusDate"
  ,"LoanStatus"
  ,"Term"
  ,"SBAGuarantyPercentage"
  ,"InitialApprovalAmount"
  ,"CurrentApprovalAmount"
  ,"UndisbursedAmount"
  ,"FranchiseName"
  ,"ServicingLenderLocationID"
  ,"ServicingLenderName"
  ,"ServicingLenderAddress"
  ,"ServicingLenderCity"
  ,"ServicingLenderState"
  ,"ServicingLenderZip"
  ,"RuralUrbanIndicator"
  ,"HubzoneIndicator"
  ,"LMIIndicator"
  ,"BusinessAgeDescription"
  ,"ProjectCity"
  ,"ProjectCountyName"
  ,"ProjectState"
  ,"ProjectZip"
  ,"CD"
  ,"JobsReported"
  ,"NAICSCode"
  ,"RaceEthnicity"
  ,"UTILITIES_PROCEED"
  ,"PAYROLL_PROCEED"
  ,"MORTGAGE_INTEREST_PROCEED"
  ,"RENT_PROCEED"
  ,"REFINANCE_EIDL_PROCEED"
  ,"HEALTH_CARE_PROCEED"
  ,"DEBT_INTEREST_PROCEED"
  ,"BusinessType"
  ,"OriginatingLenderLocationID"
  ,"OriginatingLender"
  ,"OriginatingLenderCity"
  ,"OriginatingLenderState"
  ,"Gender"
  ,"Veteran"
  ,"NonProfit"
];

/**
 * Create map for PPP loan record row 
 * @param row
 * @returns PPP Loan Data Map
 */
exports.recordMap = function (row) {
  return {
    LoanNumber: row[0],
    DateApproved: row[1],
    SBAOfficeCode: row[2],
    ProcessingMethod: row[3],
    BorrowerName: row[4],
    BorrowerAddress: row[5],
    BorrowerCity: row[6],
    BorrowerState: row[7],
    BorrowerZip: row[8],
    LoanStatusDate: row[9],
    LoanStatus: row[10],
    Term: row[11],
    SBAGuarantyPercentage: row[12],
    InitialApprovalAmount: row[13],
    CurrentApprovalAmount: row[14],
    UndisbursedAmount: row[15],
    FranchiseName: row[16],
    ServicingLenderLocationID: row[17],
    ServicingLenderName: row[18],
    ServicingLenderAddress: row[19],
    ServicingLenderCity: row[20],
    ServicingLenderState: row[21],
    ServicingLenderZip: row[22],
    RuralUrbanIndicator: row[23],
    HubzoneIndicator: row[24],
    LMIIndicator: row[25],
    BusinessAgeDescription: row[26],
    ProjectCity: row[27],
    ProjectCountyName: row[28],
    ProjectState: row[29],
    ProjectZip: row[30],
    CD: row[31],
    JobsReported: row[32],
    NAICSCode: row[33],
    RaceEthnicity: row[34],
    UTILITIES_PROCEED: row[35],
    PAYROLL_PROCEED: row[36],
    MORTGAGE_INTEREST_PROCEED: row[37],
    RENT_PROCEED: row[38],
    REFINANCE_EIDL_PROCEED: row[39],
    HEALTH_CARE_PROCEED: row[40],
    DEBT_INTEREST_PROCEED: row[41],
    BusinessType: row[42],
    OriginatingLenderLocationID: row[43],
    OriginatingLender: row[44],
    OriginatingLenderCity: row[45],
    OriginatingLenderState: row[46],
    Gender: row[47],
    Veteran: row[48],
    NonProfit: row[49]
  }
}

/**
 * Create map for PPP loan record row for CSV export
 * @param row
 * @returns PPP Loan Data Map
 */
exports.csvRecordMap = function (row) {
  return {
    LoanNumber: row[0],
    DateApproved: row[1],
    SBAOfficeCode: row[2],
    ProcessingMethod: row[3],
    BorrowerName: row[4],
    BorrowerAddress: row[5],
    BorrowerCity: row[6],
    BorrowerState: row[7],
    BorrowerZip: row[8],
    LoanStatusDate: row[9],
    LoanStatus: row[10],
    Term: row[11],
    SBAGuarantyPercentage: row[12],
    InitialApprovalAmount: row[13],
    CurrentApprovalAmount: row[14],
    UndisbursedAmount: row[15],
    FranchiseName: row[16],
    ServicingLenderLocationID: row[17],
    ServicingLenderName: row[18],
    ServicingLenderAddress: row[19],
    ServicingLenderCity: row[20],
    ServicingLenderState: row[21],
    ServicingLenderZip: row[22],
    RuralUrbanIndicator: row[23],
    HubzoneIndicator: row[24],
    LMIIndicator: row[25],
    BusinessAgeDescription: row[26],
    ProjectCity: row[27],
    ProjectCountyName: row[28],
    ProjectState: row[29],
    ProjectZip: row[30],
    CD: row[31],
    JobsReported: row[32],
    NAICSCode: row[33],
    RaceEthnicity: row[34],
    UTILITIES_PROCEED: row[35],
    PAYROLL_PROCEED: row[36],
    MORTGAGE_INTEREST_PROCEED: row[37],
    RENT_PROCEED: row[38],
    REFINANCE_EIDL_PROCEED: row[39],
    HEALTH_CARE_PROCEED: row[40],
    DEBT_INTEREST_PROCEED: row[41],
    BusinessType: row[42],
    OriginatingLenderLocationID: row[43],
    OriginatingLender: row[44],
    OriginatingLenderCity: row[45],
    OriginatingLenderState: row[46],
    Gender: row[47],
    Veteran: row[48],
    NonProfit: row[49]
  }
}
