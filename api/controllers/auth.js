/*eslint no-unused-vars: ["warn", { "varsIgnorePattern": "[iI]gnored" }]*/
const { client } = require("../database/connection");
const { TABLE, getTableName, RECORD_MAP } = require("../database/tables");
const emailer = require("../utilities/emailer");
const config = require("../env.json")[process.env.NODE_ENV || 'development'];
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlstring = require("sqlstring");

/**
 * Hash not Found Error
 */
class HashNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "HashNotFound";
  }
}
exports.HashNotFound = HashNotFound;

/**
 * Lookup user by email
 *
 * @param email
 */
function findUser(email) {
  return new Promise((resolve, reject) => {
    client.getSchema().then(schema => {
      var userCollection = schema.getTable(TABLE.USERS);
      // Lookup by email
      var results = [];
      let recordMap = RECORD_MAP.USERS;
      userCollection.select().where("email = :param").bind("param", email).execute(row => {
        results.push(recordMap(row));
      }).then(() => {
        resolve(results);
      }).catch(err => {
        // Handle database errors
        console.log("Error querying user email.", err);
        reject(err);
      })
    }).catch(err => { reject(err); });
  });
}

/**
 * Delete User's verification hash from EMAIL_VERIFY table
 *
 * @param userId
 */
function removeUserEmailVerificationCode(userId) {
  return new Promise((resolve, reject) => {
    // Delete hash from table
    client.query(`DELETE FROM ${TABLE.VERIFICATION} WHERE uid = '${userId}';`).then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Generate 128 character verification code for user
 */
function create128HashString () {
  const N = 128;
  const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(N).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
}

/**
 * Prepare and send verification email
 *
 * @param uid - User ID
 * @param email - User's email
 * @param errCallback - Function for handling errors
 */
function sendVerification(uid, email, errCallback) {
  return new Promise((resolve, reject) => {
    // Create verification hash
    const verHash = create128HashString();
    // Add to database with user ID
    client.query(`INSERT INTO ${TABLE.VERIFICATION} VALUES ('${verHash}', '${uid}', now())`).then(() => {
      // Send email
      const baseUrl = `http://${config["DB_HOST"]}`;
      emailer.sendVerificationEmail(email, `${baseUrl}/user/verification/verify-account/${uid}/${verHash}`).then(() => {
        resolve();
      }).catch(err => {
        console.log("Error sending verification email.", err);
        // DELETE verification row
        removeUserEmailVerificationCode(uid).finally(() => {
          errCallback();
        });
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Prepare and send password reset email
 *
 * @param uid - User ID
 * @param email - User's email
 */
function sendPasswordResetLink(uid, email) {
  return new Promise((resolve, reject) => {
    // Create verification hash
    const hash = create128HashString();
    // Add to database with user ID
    client.query(`INSERT INTO ${TABLE.PASSWORD_RESET} VALUES ('${hash}', '${uid}', now())`).then(() => {
      // Set password link to use frontend server
      const baseUrl = `http://${config["DB_HOST"]}`;
      // Send email
      emailer.sendPasswordResetEmail(email, `${baseUrl}/password/reset/${uid}/${hash}`).then(() => {
        resolve();
      }).catch(err => {
        console.log("Error sending password reset email.", err);
        // DELETE password reset row
        client.query(`DELETE FROM ${TABLE.PASSWORD_RESET} WHERE uid = '${uid}';`);
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

// --------------------------------------------------------------------------------------------------------------------------
//   Interface
// --------------------------------------------------------------------------------------------------------------------------

/**
 * Handle registration
 */
async function register(req, res) {
  try {
    // Check email is available
    const { tableName, mapRecord } = getTableName(TABLE.USERS);
    const result = await client.querySelect(`SELECT * FROM ${tableName} WHERE LOWER(email) = LOWER(${sqlstring.escape(req.body.email)});`, mapRecord);
    if (result.length) {
      return res.status(409).send({ msg: 'This email is already in use!' });
    }

    // Encrypt password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Create Use UUID
    const uid = uuid.v4();
    // Insert new user into database
    await client.query(`INSERT INTO ${TABLE.USERS} VALUES ('${uid}', ${sqlstring.escape(req.body.email)}, '0', '${hash}', ${sqlstring.escape(req.body.name)},
      'user', now(), now())`);
    // Send email verification
    await sendVerification(uid, req.body.email, function () {
      console.log("Unable to sending verification email. Removing registered user.");
      // Delete inserted user
      client.query(`DELETE FROM ${TABLE.USERS} WHERE UID='${uid}'`);
    });
    // Register success
    return res.status(201).send({ msg: "Registered.", uid: uid });
  } catch (err) {
    console.log("Error registering user.", err);
    return res.status(400).send({ msg: "Unable to register." });
  }
}
exports.register = register;

/**
 * Handle login
 */
async function login(req, res) {
  // Look up user
  findUser(req.body.email).then((result) => {
      // If empty result
      if (!result.length) {
        console.log("Unable to login, no user found.");
        return res.status(401).send({ msg: 'Username or password is incorrect!' });
      }
      // Check if verified
      if (result[0].verified !== 1) {
        return res.status(401).send({ msg: "User not verified." });
      }
      // check password
      bcrypt.compare(req.body.password, result[0].password, (bErr, bResult) => {
          // wrong password
          if (bErr) {
            console.log("Unable to login, incorrect password.", req.body.password);
            return res.status(401).send({ msg: 'Username or password is incorrect!' });
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].name,
                userId: result[0].uid
              },
              // TODO: generate secret key
              // // sign with RSA SHA256
              // var privateKey = fs.readFileSync('private.key');
              // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            client.query(`UPDATE ${TABLE.USERS} SET last_login = now() WHERE uid = '${result[0].uid}'`);
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({ msg: 'Username or password is incorrect!' });
        });
    }
  ).catch(err => {
    // Database error query email
    console.log("Error querying database for user.", err);
    return res.status(400).send({ msg: "Unable to resolve username or password." });
  });
  // TODO: Forgot password
}
exports.login = login;

/**
 * Verify user's email from generated link
 *
 * @param userId
 * @param code - Generated Hash for verification
 */
async function verifyEmail(userId, code) {
  // Lookup code for user
  var results = await client.querySelect(`SELECT * FROM ${TABLE.VERIFICATION} WHERE UID='${userId}' AND VERIFICATION_HASH='${code}';`, RECORD_MAP.VERIFICATION);
  if (results.length === 0) {
    console.log(`Verification Hash ${code} not found for user ID: ${userId}.`);
    throw new HashNotFound("");
  }

  // Set user verified to true
  await client.query(`UPDATE ${TABLE.USERS} SET verified = '1';`);

  // Delete hash from table
  await removeUserEmailVerificationCode(userId);
}
exports.verifyEmail = verifyEmail;

/**
 * Resending verification email
 */
async function resendVerificationEmail(userId, email) {
  // DELETE previous verifications
  await removeUserEmailVerificationCode(userId);

  // Send verification email
  // TODO: Should we query for user email, or continue using client given email
  await sendVerification(userId, email, {});
}
exports.resendVerificationEmail = resendVerificationEmail;

/**
 * Resetting user's forgotten password
 */
async function resetPassword(email) {
  // Look up uid for email
  var results = await client.querySelect(`SELECT * FROM ${TABLE.USERS} WHERE EMAIL='${email}';`, RECORD_MAP.USERS);
  if (results.length === 0) {
    throw Error(`Unable to locate user for email ${email}.`);
  }
  console.log(results);

  // If email exists, email password reset link
  await sendPasswordResetLink(results[0].uid, email);
}
exports.resetPassword = resetPassword;

/**
 * Set user's forgotten password
 */
async function setPassword(userId, hash, password) {
  // Check hash for UserId exists
  var results = await client.querySelect(`SELECT * FROM ${TABLE.PASSWORD_RESET} WHERE UID='${userId}' AND HASH='${hash}';`, RECORD_MAP.PASSWORD_RESET);
  if (results.length === 0) {
    throw Error(`Unable to locate password reset hash for user ${userId} on password reset.`);
  }
  console.log(results);

  // Encrypt password
  const passwordHash = bcrypt.hashSync(password, 10);

  // If hash exists, set password
  await client.query(`UPDATE ${TABLE.USERS} SET password = '${passwordHash}' WHERE uid = '${userId}';`);

  // Remove reset hash
  await client.query(`DELETE FROM ${TABLE.PASSWORD_RESET} where HASH='${hash}';`);
}
exports.setPassword = setPassword;
