var express = require("express");
const userMiddleware = require('../middleware/users.js');
const subscriptionController = require("../controllers/subscription");
const csvExportController = require("../controllers/csvExporter");

var router = express.Router();

// Routes
router.get("/subscriptions/retrieve", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attempting subscription retrieval for UID: ", req.query.uid);
  subscriptionController.retrieve(req, res);
});

router.post("/subscriptions/new", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attempting to create subscription: ", req.body);
  subscriptionController.create(req.body.data, res);
});

router.post("/subscription/delete", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attempting to delete subscription: ", req.body);
  subscriptionController.remove(req.body.sid, res);
});

router.post("/subscription/update", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attempting subscription update: ", req.body);
  subscriptionController.updateSubscription(req.body.sid, res);
});

router.get("/subscription/records/count", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attemping record county retrieval for subscription: ", req.query.sid);
  subscriptionController.getSubscriptionRecordCount(req.query, res);
});

router.get("/subscription/records/retrieve", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attemping record retrieval for subscription: ", req.query);
  subscriptionController.getSubscriptionRecordsByPage(req.query, res);
});

router.get("/subscription/download", userMiddleware.isAuthorized, (req, res) => {
  console.log("Attemping to generate CSV.");
  csvExportController.downloadSubscriptionData(req, res);
});

module.exports = router;
