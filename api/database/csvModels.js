const { TABLE } = require("./tables");
const { csvModel: pppCsvModel, csvRecordMap: pppLoansCsvMap } = require("../models/PppLoans");
const { clerkCivilCsvModel } = require("../models/ClerkCivil");

// Map of models for CSV export
const MODEL = {
  DIVORCE: clerkCivilCsvModel,
  EVICTION: clerkCivilCsvModel,
  FORECLOSURE: clerkCivilCsvModel,
  PPP_LOANS: pppCsvModel
}

/**
 * Get SQL table name from subscription type
 *
 * @param type
 * @returns Object containing table name and mapping function
 */
exports.getTableName = function (type) {

  var tableName = Object.keys(TABLE).find(key => TABLE[key] === type.toUpperCase() ? TABLE[key] : undefined);

  if (tableName !== undefined) {
    return {
      tableName: tableName,
      mapRecord: pppLoansCsvMap
    };
  } else {
    return {
      tableName: "",
      mapRecord: {}
    };
  }
}

/**
 * Get CSV export model from subscription type
 *
 * @param type
 * @returns model
 */
exports.getModel = function (type) {
  var modelName = Object.keys(MODEL).find(key => key === type.toUpperCase());
  if (modelName !== undefined) {
    return MODEL[modelName];
  }
  return undefined;
}
