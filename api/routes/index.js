var express = require("express");

const tempController = require("../controllers/temp");
const feedbackController = require("../controllers/feedback");

const authRoutes = require("./auth");
const subscriptionRoutes = require("./subscription");
const requestRoutes = require("./file-requests");
const checkoutRoutes = require("./checkout");

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
router.use(checkoutRoutes);

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
 * TEST
 */
 router.get("/test", function (req, res) {
   tempController.production0(res);
 });

module.exports = router;
