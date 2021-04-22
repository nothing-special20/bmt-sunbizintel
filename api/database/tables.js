const { model: userModel, recordMap: userMap } = require("../models/User");
const { model: emailVerifyModel, recordMap: emailVerifyMap } = require("../models/EmailVerify");
const { model: passwordResetModel, recordMap: passwordResetMap } = require("../models/PasswordReset");
const { clerkCivilModel } = require("../models/ClerkCivil");
const { model: pppLoansModel, recordMap: pppLoansMap } = require("../models/PppLoans");
const { model: pppLoansSearchModel, recordMap: pppLoansSearchMap } = require("../models/PppLoansSearch");
const { model: fileRequestHistoryModel, recordMap: fileRequestHistoryMap } = require("../models/FileRequestHistory");
const { model: ordersModel, recordMap: ordersMap } = require("../models/Orders");
const { subscriptionsModel } = require("../models/Subscriptions");
const { model: hillsClerkCivilModel, recordMap: hillsClerkCivilMap } = require("../models/FlClerkCivil");

// List of tables
const TABLE = {
  USERS: "USERS",
  VERIFICATION: "EMAIL_VERIFY",
  PASSWORD_RESET: "PASSWORD_RESET",
  SUBSCRIPTIONS: "SUBSCRIPTIONS",
  DIVORCE: "DIVORCE",
  FORECLOSURE: "FORECLOSURE",
  EVICTION: "EVICTION",
  PPP_LOANS_SEARCH: "PPP_LOANS_SEARCH",
  PPP_LOANS: "PPP_LOANS",
  FILE_REQUEST_HISTORY: "FILE_REQUEST_HISTORY",
  ORDERS: "ORDERS",
  PPP_PUBLIC_NY: "PPP_PUBLIC_NY",
  PPP_PUBLIC_NY_TEST: "PPP_PUBLIC_NY_TEST",
  BNI_REF_REQUESTS: "BNI_REF_REQUESTS",
  DAAS_RESEARCH: "DAAS_RESEARCH",
  HILLSBOROUGH_CLERK_CIVIL: "HILLSBOROUGH_CLERK_CIVIL"
}
exports.TABLE = TABLE;

// Map of models
const MODEL = {
  USERS: userModel,
  VERIFICATION: emailVerifyModel,
  PASSWORD_RESET: passwordResetModel,
  PPP_LOANS_SEARCH: pppLoansSearchModel,
  PPP_LOANS: pppLoansModel,
  FILE_REQUEST_HISTORY: fileRequestHistoryModel,
  ORDERS: ordersModel,
  SUBSCRIPTIONS: subscriptionsModel,
  DIVORCE: clerkCivilModel,
  EVICTION: clerkCivilModel,
  FORECLOSURE: clerkCivilModel,
  HILLSBOROUGH_CLERK_CIVIL: hillsClerkCivilModel
}
exports.MODEL = MODEL;

// Record Map
var RECORD_MAP = {
  USERS: userMap,
  VERIFICATION: emailVerifyMap,
  PASSWORD_RESET: passwordResetMap,
  PP_LOANS_SEARCH: pppLoansSearchMap,
  PPP_LOANS: pppLoansMap,
  FILE_REQUEST_HISTORY: fileRequestHistoryMap,
  ORDERS: ordersMap,
  HILLSBOROUGH_CLERK_CIVIL: hillsClerkCivilMap
}
exports.RECORD_MAP = RECORD_MAP;

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
      mapRecord: RECORD_MAP[tableName]
    };
  } else {
    return {
      tableName: "",
      mapRecord: {}
    };
  }
}

/**
 * Get SQL table model from subscription type
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
