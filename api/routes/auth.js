var express = require("express");
const userMiddleware = require('../middleware/users.js');
const authController = require("../controllers/auth");

var router = express.Router();

// Routes
router.post("/user/register", userMiddleware.validateRegister, function(req,res) {
  authController.register(req, res);
});

router.post("/user/login", (req, res) => {
  console.log("Attempting sign in...");
  authController.login(req, res);
});

router.post("/user/verification/verify-account", (req, res) => {
  authController.verifyEmail(req.body.userId, req.body.hash).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Unable to verify email address for user ID: ${req.params.userId}`, err);
    if (err instanceof authController.HashNotFound) {
      res.status(401).send({ msg: "Not Found" });
    } else {
      res.status(500).send({ msg: "Unable to verify email." });
    }
  });
});

router.post("/user/verification/resend", (req, res) => {
  authController.resendVerificationEmail(req.body.userId, req.body.email).then(() => {
    res.status(200).send("OK");
  }).catch((err) => {
    console.log(`Error resending verification email for user ${req.body.userId}.`, err);
    res.status(500).send({ msg: "Error sending verification email." });
  });
});

router.post("/user/password/forgot", (req, res) => {
  console.log("Forgot password request for email: ", req.body);
  authController.resetPassword(req.body.email).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Error resetting user password for email ${req.body.email}.`, err);
    res.status(500).send({ msg: "Unable to reset password." });
  });
});

router.post("/user/password/reset", userMiddleware.validatePassword, (req, res) => {
  authController.setPassword(req.body.userId, req.body.hash, req.body.password).then(() => {
    res.status(200).send("OK");
  }).catch(err => {
    console.log(`Unable to set new password for user ID ${req.body.userId}.`, err);
    res.status(500).send({ msg: "Unable to change password." });
  });
})

module.exports = router;
