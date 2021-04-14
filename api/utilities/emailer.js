const nodemailer = require("nodemailer");
const config = require("../env.json")[process.env.NODE_ENV || "development"];

function getTransport() {
  // Create the transporter with the required configuration for Outlook
  // change the user and pass !
  return nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP,
    debug: false,
    logger: true,
    tls: {
      ciphers:'SSLv3'
    },
    /*service: "Outlook365",*/
    auth: {
      user: config["EMAIL"].USER,
      pass: config["EMAIL"].PASS,
    }
  });
}

async function sendVerificationEmail(email, url) {
  try {
    // send mail with defined transport object
    let info = await getTransport().sendMail({
      from: config["EMAIL"].USER, // sender address
      to: email, // list of receivers
      subject: "Verify Email", // Subject line
      text: "", // plain text body
      html: `<html><h3>Please use link below to verify email:</h3><a href="${url}">Verify Here</a></html>` // html body
    });

    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  catch (err) {
    throw new Error(err);
  }
}
exports.sendVerificationEmail = sendVerificationEmail;

async function sendPasswordResetEmail(email, url) {
  try {
    // send mail with defined transport object
    let info = await getTransport().sendMail({
      from: config["EMAIL"].USER, // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      text: "", // plain text body
      html: `<html><h3>Please use link below to reset password:</h3><a href="${url}">Reset Password</a></html>` // html body
    });

    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  catch (err) {
    throw new Error(err);
  }
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
