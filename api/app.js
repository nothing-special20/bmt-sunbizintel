const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const config = require("./env.json")[process.env.NODE_ENV || 'production'];

// Create app
const app = express()
app.set("port", process.env.PORT || config.PORT);

// Add morgan
app.use(morgan("combined"));

// Add body parser
app.use(bodyParser.json());

// Set up cors
const whitelist = ["http://localhost:8080", "https://localhost:8080",
                    "sunshineanalytics.io", "http://sunshineanalytics.io", "https://sunshineanalytics.io", "www.sunshineanalytics.io",  "http://www.sunshineanalytics.io", "https://www.sunshineanalytics.io",
                    "208.87.133.239", "http://208.87.133.239", "https://208.87.133.239"];
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Add Routes
app.use(require("./routes"));

// Force HTTPS
app.use(function(req, res, next) {
  if (req.secure || req.headers["x-forwarded-proto"] == "https") {
    return next();
  }
  else {
    return res.redirect("https://" + req.headers.host + req.url);
  }
});

app.listen(app.get('port'), () => console.log("App listening at http://localhost:" + app.get("port")))
//module.exports = app;
