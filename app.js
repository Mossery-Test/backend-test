var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

// Koneksi Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://Lukuzushiki:test@cluster0-shard-00-00.epd1c.mongodb.net:27017,cluster0-shard-00-01.epd1c.mongodb.net:27017,cluster0-shard-00-02.epd1c.mongodb.net:27017/db_mossery?ssl=true&replicaSet=atlas-6e5dri-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 365 * 24 * 60 * 60 * 1000 },
  })
);
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
//Admin Routes
app.use("/admin", adminRouter);
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
