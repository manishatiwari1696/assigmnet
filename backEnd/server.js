var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var https = require("http");

var user = require("./routes/user");
var db = require("./config/db");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


//routes
app.use("/user", user);


//for running frontend build through backend
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
var server = https.Server(app);


app.listen(4000);