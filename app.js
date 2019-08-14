var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("hbs");
var exphbs = require("express-handlebars");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var passport = require('passport');

var app = express();
//for BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set("views", "views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: "",
    partialsDir: ["views"],
    helpers: {
      if_eq: function (a, b, opts) {
        var n = typeof a;
        if (n == b && n.length > 0 ) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      } 
    }
  })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: "cuarto-sistemas-A",
    resave: true,
    saveUninitialized: true
  })
);

require("dotenv").config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
