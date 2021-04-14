/*eslint no-unused-vars: ["warn", { "varsIgnorePattern": "[iI]gnored" }]*/
const uuid = require("uuid");
const { getDateTime } = require("../utilities/date");
const { client } = require("../database/connection");
const { TABLE, MODEL, getTableName } = require("../database/tables");

/**
 * Create Map for subscription row
 * @param row
 * @returns Subscription Data Map
 */
function createSubscriptionMap(row) {
  return {
    sid: row[0],
    uid: row[1],
    county: row[2],
    type: row[3],
    lastView: row[4],
    lastUpdate: row[5],
    created: row[6]
  }
}

/**
 * Lookup subscriptions by user ID
 *
 * @param userId
 */
function getUserSubscriptions(userId) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);

      // Query for subscriptions filtering on user ID
      var results = [];
      table.select().where("uid = :param").bind("param", userId).execute(row => {
        results.push(createSubscriptionMap(row));
      }).then(() => {
        resolve(results);
      }).catch(err => {
        // Handle database errors
        console.log("Error querying user subscriptions.", err);
        reject(err);
      });
    }).catch(err => { reject(err); });
  });
}

/**
 * Check if user subscription already exists
 *
 * @param userId
 * @param county
 * @param type
 * @return subscription
 */
function checkSubscriptionExists(userId, county, type) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);

      var result = undefined;
      table.select().where("uid = :param1 AND county = :param2 AND type = :param3")
        .bind("param1", userId)
        .bind("param2", county)
        .bind("param3", type)
        .execute(row => {
          result = createSubscriptionMap(row);
        }).then(() => {
          resolve(result);
        }).catch(err => {
          console.log("Error checking if user subscription exists.", err);
          reject(err);
        });
    }).catch(err => { reject(err); });
  });
}

/**
 * Insert new subscription into database
 *
 * @param userId
 * @param county
 * @param type
 * @return subscription
 */
function createSubscription(userId, county, type) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);
      // Insert values
      table.insert(MODEL.SUBSCRIPTIONS).values(uuid.v4(), userId, county, type, getDateTime(), getDateTime(), getDateTime()).execute().then(() => {
        resolve();
      }).catch(err => {
        console.log(err);
        reject(`Could not insert (${userId}, ${county}, ${type}) in database.`, err);
      });
    }).catch(err => { reject(err) })
  });
}

/**
 * Remove subscription from database
 * @param sId - Subscription ID
 * @returns Response
 */
function deleteSubscription(sId) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);

      table.delete().where("sid = :param").bind("param", sId).execute().then(() => {
        resolve("OK");
      }).catch(err => {
        reject(err);
      });
    }).catch(err => { reject(err) });
  });
}

/**
 * Lookup subscription
 * @param sId - Subscription ID
 * @returns Subscription data
 */
function getSubscription(sId) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);

      var result = {};
      table.select().where("sid = :param").bind("param", sId).execute(row => {
        result = createSubscriptionMap(row);
      }).then(() => {
        console.log(result);
        resolve(result);
      }).catch(err => {
        console.log(`Error querying subscription ${sId}: `, err);
        reject(err);
      });
    }).catch(err => { reject(err) });
  });
}

/**
 * Update LAST VIEWED Time for subscription
 *
 * @param sId
 * @resolves Success or failure
 */
function updateSubscriptionLastViewTime(sId) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.SUBSCRIPTIONS);

      var result = {};
      table.update().set("LAST_VIEW", getDateTime()).where("sid = :param").bind("param", sId).execute(row => {
        result = createSubscriptionMap(row);
      }).then(() => {
        console.log(result);
        resolve(result);
      }).catch(err => {
        console.log(`Error querying subscription ${sId}: `, err);
        reject(err);
      });
    }).catch(err => { reject(err) });
  });
}

/**
 * Lookup record count in Table <type> filtering on county
 *
 * @param type   - Subscription type
 * @param county - Subscription county
 * @returns Count of records
 */
function getRecordCount(type, county, ) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      // Get table name and row mapping function
      var { tableName } = getTableName(type);
      // Get table
      var table = schema.getTable(tableName);

      var count = 0;
      // select * from DIVORCE order by filing_date desc, created desc limit <offset>,<per_page>;
      table.select().where("BORROWERSTATE = :param")
      .bind("param", county).execute(() => {
        count += 1;
      }).then(() => {
        resolve(count);
      }).catch(err => {
        console.log(`Error retrieving (${type}) for (${county}).`, err);
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Lookup record in Table <type> filtering on county
 *
 * @param type       - Subscription type
 * @param county     - Subscription county
 * @param limit      - Amount of records to retrieve
 * @param page       - Current page
 * @param totalPages - Total number of pages
 * @returns Records data
 */
function getRecords(type, county, limit, page, totalPages) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      // Get table name and row mapping function
      var { tableName, mapRecord } = getTableName(type);
      // Get table
      var table = schema.getTable(tableName);

      var offset = page*limit - limit;
      console.log(`Fetching ${limit} records at offset ${offset}. Total Pages: ${totalPages}`);

      var results = [];
      // select * from DIVORCE order by filing_date desc, created desc limit <offset>,<per_page>;
      table.select().where("BORROWERSTATE = :param")
      .bind("param", county)
      .orderBy(["CURRENTAPPROVALAMOUNT DESC"])
      .limit(limit)
      .offset(offset).execute(row => {
        // Create object map for row
        results.push(mapRecord(row));
      }).then(() => {
        resolve(results);
      }).catch(err => {
        console.log(`Error retrieving (${type}) for (${county}).`, err);
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Retrieve Subscriptions
 */
async function retrieve(req, res) {
  // Look up subscriptions
  getUserSubscriptions(req.query.uid).then((result) => {
      // If empty result
      if (!result.length) {
        return res.status(401).send({ msg: "No subscriptions found." });
      }
      return res.status(200).send(result);
    }
  ).catch(err => {
    // Database error
    console.log("Error querying database for user subscriptions.", err);
    return res.status(400).send({ msg: "No subscriptions found." });
  });
}
exports.retrieve = retrieve;

/**
 * Create New Subscription
 */
async function create(data, res) {

  try {
    var subscription = await checkSubscriptionExists(data.uid, data.county, data.type);

    if (subscription !== undefined) {
      // Already exists
      return res.status(406).send({ msg: "Subscription already exists." });
    }
    else {
      // Create new subscription
      await createSubscription(data.uid, data.county, data.type);
      return res.status(200).send("OK")
    }
  } catch (err) {
    console.log("Error creating subscription.", err);
    return res.status(400).send({ msg: "Unable to create subscription." });
  }
}
exports.create = create;

/**
 * Delete Subscription
 */
async function remove(sid, res) {

  try {
    // Delete
    var response = deleteSubscription(sid);
    // Return OK
    return res.status(200).send(response);
  } catch (err) {
    console.log(`Error removing subscription ${sid}.`, err);
    return res.status(500).send({ msg: "Unable to remove subscription." });
  }
}
exports.remove = remove;

/**
 * Retrieve case data for subscription
 */
async function getSubscriptionRecordCount({ sid }, res) {
  // Get subscription data
  getSubscription(sid).then(result => {
    if (result === undefined) {
      return res.status(500).send({ msg: "Could not find subscription." });
    }
    console.log("HERE:");
    // Get count
    getRecordCount(result.type, result.county).then(count => {
      console.log("Found ", count, " records.");
      return res.status(200).send(`${count}`);
    }).catch(err => {
      throw new Error(`Error retrieving subscription record count for ID (${sid}) COUNTY (${result.county}) TYPE (${result.type}).`, err);
    });
  }).catch(err => {
    console.log(`Error retrieving subscription.`, err);
    return res.status(500).send({ msg: "Could not retrieve subscription data." });
  });
}
exports.getSubscriptionRecordCount = getSubscriptionRecordCount;

/**
 * Retrieve case data for subscription by page
 */
async function getSubscriptionRecordsByPage({ sid, limit, page, totalPages }, res) {
  // Get subscription data
  getSubscription(sid).then(result => {
    if (result === undefined) {
      return res.status(500).send({ msg: "Could not find subscription." });
    }

    // Get data for subscription
    getRecords(result.type, result.county, limit, page, totalPages).then(cases => {
      return res.status(200).send(cases);
    }).catch(err => {
      console.log(`Error retrieving subscription data for ID (${sid}) COUNTY (${result.county}) TYPE (${result.type}).`, err);
      return res.status(500).send({ msg: "Could not retrieve subscription data." });
    })
  }).catch(err => {
    console.log("Error retrieving subscription.", err);
    return res.status(500).send({ msg: "Could not retrieve subscription data." });
  })
}
exports.getSubscriptionRecordsByPage = getSubscriptionRecordsByPage;

/**
 * Update subscription
 */
async function updateSubscription(sId, res) {
  updateSubscriptionLastViewTime(sId).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Error updating last view time for subscription: ${sId}.`, err);
    res.status(500).send("Could not update.");
  });
}
exports.updateSubscription = updateSubscription;
