const { client } = require("../database/connection");
const { TABLE } = require("../database/tables");

/**
 * Insert user feedback into database
 *
 * @param feedbackObject - Object containing job, industry, change, addition, other, email
 */
async function insertFeedback({job, industry, change, addition, other, email}) {
  try {
    await client.query(`INSERT INTO ${TABLE.QUESTIONS} VALUES ('${job}', '${industry}', '${change}', '${addition}', '${other}', '${email}')`);
  } catch (err) {
     throw Error(err);
  }
}
exports.insertFeedback = insertFeedback;
