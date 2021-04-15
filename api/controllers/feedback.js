const { client } = require("../database/connection");
const { TABLE } = require("../database/tables");

/**
 * Insert user feedback into database
 *
 * @param feedbackObject - Object containing job, industry, change, addition, other, email
 */
async function insertFeedback({bniMbrName, bniMbrEmail, bniChapter, refName, refCompany, refJob, message}) {
  try {
    await client.query(`INSERT INTO ${TABLE.BNI_REF_REQUESTS} VALUES ('${bniMbrName}', '${bniMbrEmail}', '${bniChapter}', '${refName}', '${refCompany}', '${refJob}', '${message}')`);
  } catch (err) {
     throw Error(err);
  }
}
exports.insertFeedback = insertFeedback;
