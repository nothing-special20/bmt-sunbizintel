var express = require("express");

const tempController = require("../controllers/temp");
const feedbackController = require("../controllers/feedback");
const daasResearchController = require("../controllers/daasresearch");

const authRoutes = require("./auth");
const subscriptionRoutes = require("./subscription");
const requestRoutes = require("./file-requests");

var router = express.Router();

// Middle ware for time logs
router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toISOString());
  next();
});

// Routes
router.use(authRoutes);
router.use(subscriptionRoutes);
router.use(requestRoutes);

/**
 * User feedback route
 */
 router.post("/feedback", (req, res) => {
  console.log("Received feedback.", req.body);
  feedbackController.insertFeedback(req.body).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Unable to add user feedback.`, err);
    res.status(500).send({ msg: "Unable to add user feedback." });
  });
});

/**
 * DaaS Research route
 */
 router.post("/daasresearch", (req, res) => {
  console.log("Received feedback.", req.body);
  daasResearchController.insertDaaSResearch(req.body).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Unable to add user feedback.`, err);
    res.status(500).send({ msg: "Unable to add user feedback." });
  });
});

/**
 * TEST
 */
 router.get("/test", function (req, res) {
   tempController.production0(res);
 });

module.exports = router;
