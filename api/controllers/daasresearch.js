const { client } = require("../database/connection");
const { TABLE } = require("../database/tables");

/**
 * Insert user feedback into database
 *
 * @param feedbackObject - Object containing job, industry, change, addition, other, email
 */
async function insertDaaSResearch({name, job, industry, business, dataDesc, dataUse, dataLink, dataValue, other, currServices, email}) {
  try {
    await client.query(`INSERT INTO ${TABLE.DAAS_RESEARCH} VALUES ('${name}', '${job}', '${industry}', '${business}', '${dataDesc}', '${dataUse}', '${dataLink}', '${dataValue}', '${other}', '${currServices}', '${email}')`);
  } catch (err) {
     throw Error(err);
  }
}
exports.insertDaaSResearch = insertDaaSResearch;
