var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var config = require("./config/mongodb");

var indexRouter = require("./routes/index");
var main = require("./routes/main");
var aboutUs = require("./routes/aboutUs");
var login = require("./routes/login");
var signin = require("./routes/signin");

var usersRouter = require("./routes/users");
var DocsRouter = require("./routes/doctor");
var citaRouter = require("./routes/cita");



var app = express();
config.connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/main", main);
app.use("/aboutUs", aboutUs);
app.use("/login", login);
app.use("/signin", signin);

app.use("/users", usersRouter);
app.use("/doctor", DocsRouter);
app.use("/cita", citaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;