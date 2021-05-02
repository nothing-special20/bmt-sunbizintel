// include mysql module
var mysql = require('mysql');
const config = require("./env.json")[process.env.NODE_ENV || 'production'];

// create a connection variable with the required details
var con = mysql.createConnection({
  host: config["DB_HOST"],
  user: config["DB_USER"],
  password: config["DB_PASSWORD"],
  database: config["DATABASE"],
  port: "33060"
});

var firstname=document.getElementByID("firstname").value;
var lastname=document.getElementByID("lastname").value;
var email=document.getElementByID("email").value;
var company=document.getElementByID("company").value;
var message=document.getElementByID("message").value;

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("INSERT INTO `FL_CLERK_QUESTIONS` (`firstname`, `lastname`, `email`, `company`, `message`) VALUES ('$firstname', '$lastname', '$email', '$company', '$message')", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
});
