const jwt = require("jsonwebtoken");

/**
 * Validate email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
/**
 * Validate password
*/
function checkPasswords(req, res, next) {
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      msg: 'Please enter a password with min. 6 chars'
    });
  }
  // password (repeat) does not match
  if (!req.body.password_confirmation || req.body.password != req.body.password_confirmation) {
    return res.status(400).send({
      msg: 'Both passwords must match'
    });
  }
  next();
}

module.exports = {
  validatePassword: (req, res, next) => {
    checkPasswords(req, res, next);
  },
  validateRegister: (req, res, next) => {
    // check email
    if (!validateEmail(req.body.email)) {
      return res.status(400).send({
        msg: 'Please enter a valid email'
      });
    }
    if (!req.body.name.length > 0) {
      return res.status(400).send({
        msg: "Please enter a name"
      });
    }
    // Next will be initiated in validatePassword
    checkPasswords(req, res, next);
  },
  isAuthorized: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // TODO: Change secret key
      /*
      // verify a token asymmetric
      var cert = fs.readFileSync('public.pem');  // get public key
      jwt.verify(token, cert, function(err, decoded) {
        console.log(decoded.foo) // bar
      });
      */
      const decoded = jwt.verify(token, 'SECRETKEY');
      req.userData = decoded;
      next();
    } catch (err) {
      console.log("Rejecting authorization request.", err);
      return res.status(401).send({ msg: 'Your session is not valid!' });
    }
  }
};