const mysqlx = require('@mysql/xdevapi');
const config = require("../env.json")[process.env.NODE_ENV || 'development'];

/**
 *  Establish connection
 */
function connect () {
  return new Promise((resolve, reject) => {
    mysqlx.getSession({
      user: config["DB_USER"],
      password: config["DB_PASSWORD"],
      host: config["DB_HOST"],
      port: 33060
    })
    .then(function (session) {
      resolve(session);
    })
    .catch(function (err) {
      console.log("Error connecting to database.", err);
      reject("Unable to perform operation.");
    });
  });
}

// Create connection

var client = {
  /**
   * Get session connection
   */
  getSession: function() {
    return connect();
  },
  /**
   * Get schema connection
   */
  getSchema: function() {
    return new Promise((resolve) => {
      connect().then(session => {
        resolve(session.getSchema(config["DATABASE"]));
      });
    });
  },
  /**
   * Run SQL query
   */
  query: function(sql) {
    return new Promise((resolve, reject) => {
      // Connect
      connect().then(connection => {
        // Change database
        connection.sql(`USE ${config["DATABASE"]}`).execute();
        // TODO: Remove debug line
        console.log("Running query:", sql);
        // Execute sql statement
        connection.sql(sql).execute().then(res => {
          resolve(res.fetchAll());
          connection.close();
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  },
  /**
   * Run SQL query
   */
  querySelect: function(sql, map) {
    return new Promise((resolve, reject) => {
      // Connect
      connect().then(connection => {
        // Change database
        connection.sql(`USE ${config["DATABASE"]}`).execute();
        // Query results mapped
        var results = [];
        // Execute sql statement
        connection.sql(sql).execute(row => {
          results.push(map(row));
        }).then(() => {
          resolve(results);
          connection.close();
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
}
exports.client = client;

// Attemp initial connection
// TODO: Remove for dev only
connect().then(connection => {
  console.log("Connected to database.");
  connection.close();
}).catch(err => {
  console.log("Unable to connect to database.", err);
});
