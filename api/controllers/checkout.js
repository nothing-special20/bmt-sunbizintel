const uuid = require("uuid");

const { getDate } = require("../utilities/date");
const { client } = require("../database/connection");
const { TABLE, MODEL } = require("../database/tables");
const fileRequestController = require("./fileRequest");

// Get stripe key
const config = require("../env.json")[process.env.NODE_ENV || 'development'];

// Create stripe connection
const stripe = require("stripe")(config["STRIPE_SECRET_KEY"]);

/**
 * Check
 *
 * @param orderId
 * @param fileId
 * @param userId
 * @param price
 */
function orderExists(orderId) {
  console.log(orderId);
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.ORDERS);
      // Insert values
      let exists = false;
      table.select(MODEL.ORDERS).where("ORDER_ID = :param").bind("param", orderId).execute(() => {
        exists = true;
      }).then(() => {
        resolve(exists);
      }).catch(err => {
        reject({ 
          msg: `Error querying to database for order ${orderId}.`,
          err: err
        });
      });

    }).catch(err => { reject(err); });
  });
}

/**
 * Insert file into ORDER table
 *
 * @param orderId
 * @param fileId
 * @param userId
 * @param price
 */
function insertOrder(orderId, fileId, userId, price) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var table = schema.getTable(TABLE.ORDERS);
      // Insert values
      table.insert(MODEL.ORDERS).values(orderId, fileId, userId, getDate(), price).execute().then(() => {
        resolve();
      }).catch(err => {
        reject({ 
          msg: `Could not add order for ${fileId} to database for user ${userId}.`,
          err: err
        });
      });

    }).catch(err => { reject(err); });
  });
}

/**
 * Public function to process purchases files
 */
async function processPurchase({ purchases, orderId, userId }, res) {
  try {

    // Don't order not already added
    if (await orderExists(orderId)) {
      console.log(`Order ${orderId} already exists.`);
      return res.status(500).send({ msg: "" });
    }

    console.log("Inserting order son.");
    // Insert purchased items
    let items = JSON.parse(purchases);
    for (let i = 0; i< items.length; i++) {
      const fileId = uuid.v4();
      await fileRequestController.insertPurchasedFile(fileId, userId, JSON.parse(items[i].data), items[i].recordCount);
      await insertOrder(orderId, fileId, userId, items[i].price);
    }
    
    return res.status(200).send("OK");
  } catch (err) {
    console.log(`Error processing purchase for user ${userId}.`, err);
    return res.status(500).send({ msg: "Error with purchase." });
  }
}
exports.processPurchase = processPurchase;

/**
 * Public function to get STRIPE session
 */
async function getStripeSession(data, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      payment_method_types: ["card"],
      line_items: data.lineItems,
      mode: "payment",
    });
    return res.status(200).send({
        key: config["STRIPE_PUBLISHABLE_KEY"],
        session: session
      });
   } catch (err) {
     console.log("Error creating stripe session.", err);
     return res.status(500).send({ msg: "Unable to perform checkout." });
   }
}
exports.getStripeSession = getStripeSession;
