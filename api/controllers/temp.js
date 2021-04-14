/*eslint no-unused-vars: ["warn", { "varsIgnorePattern": "[iI]gnored" }]*/
const { client } = require("../database/connection");


/**
 * Lookup user by email
 *
 * @param email
 */
function getData() {
  return new Promise((resolve, reject) => {
    client.getSession().then(session => {
      // Get Table
      var userCollection = session.getSchema("PRODUCTION").getTable("SHAWN_YESNER");
      
      // Get all data
      var results = [];
      var i = 0;
      userCollection.select().execute(row => {
        results.push({
          case: row[0],
          defendant: row[1],
          address: row[2],
          plaintiff: row[3],
          description: row[4],
          date: row[5],
          county: row[6]
        });
      }, columns => {}).then(() => {
        console.log(results);
        resolve(results);
      }).catch(err => {
        // Handle database errors
        console.log("Error fetch shawn yesner data", err);
        reject(err);
      })
    }).catch(err => { reject(err); });
  });
}



/**
 * Handle login
 */
async function production0(res) {
  getData().then(result => { 
    return res.status(200).send(result);
  }).catch(err => {
    return res.status(400).send({ msg: err });
  });
}
exports.production0 = production0;
