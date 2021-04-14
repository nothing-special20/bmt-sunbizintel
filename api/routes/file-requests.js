var express = require("express");
const userMiddleware = require('../middleware/users.js');
const fileRequestController = require("../controllers/fileRequest");

// Define router
var router = express.Router();

// TODO: Middleware to validate inputs

// Routes
router.get("/request/file/data", userMiddleware.isAuthorized, (req, res) => {
  console.log("Received request for file. ", req.query);
  fileRequestController.getFileData(req.query, res);
});

// router.get("/request/file/download", userMiddleware.isAuthorized, (req, res) => {
//   console.log("Received file request download." , req.query);
//   fileRequestController.getFileForDownload(req.query, res);
// });

router.get("/request/file/history", userMiddleware.isAuthorized, (req, res) => {
  console.log("Fetching file request history." , req.query);
  fileRequestController.getUserFileRequestHistory(req.query, res);
});

router.get("/request/file/history/download", userMiddleware.isAuthorized, (req, res) => {
  console.log("Received previous history download.", req.query);
  fileRequestController.getFileForDownload(req.query, res);
});

router.get("/request/file/sample", userMiddleware.isAuthorized, (req, res) => {
  console.log("Getting sample file.");
  fileRequestController.getSampleFile(res);
});

module.exports = router;
