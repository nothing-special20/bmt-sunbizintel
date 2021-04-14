const express = require('express');
const userMiddleware = require('../middleware/users.js');
const checkoutMiddleware = require("../middleware/checkout.js");

const checkoutController = require("../controllers/checkout");

var router = express.Router();

router.post("/checkout/payment/complete", userMiddleware.isAuthorized, (req, res) => {
	console.log("Received payment submission.", req.body);
	checkoutController.processPurchase(req.body, res);
});

router.get("/checkout/stripe/session", userMiddleware.isAuthorized, checkoutMiddleware.validateCheckout, (req, res) => {
  console.log("Retrieved request for stripe session.", req.query);
  checkoutController.getStripeSession(req.query, res);
});

module.exports = router;
