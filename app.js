var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// const bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');
var formRoute = require('./routes/formHandle');
var loginRoute = require('./routes/loginHandle');
var adminRoute = require('./routes/admin');
var newPostRoute = require('./routes/newPost');
var logoutRoute = require('./routes/logoutHandle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable sessions
app.use(session({
    secret:"somesecretkey",
    resave: false, // Force save of session for each request
    saveUninitialized: false, // Save a session that is new, but has not been modified
    cookie: {maxAge: 10*60*1000 } // milliseconds!
}));

app.use('/', indexRouter);
app.use('/action', formRoute);
app.use('/api', usersRouter);
app.use('/login', loginRoute);
app.use('/newPost', newPostRoute);
app.use('/admin', adminRoute);
app.use('/logout', logoutRoute);

const db = require('./models/index');
// create the tables if don't exist

db.sequelize.sync()
    .then(() => {
        console.log('Database Synced');
        return Promise.all([
            db.User.findOrCreate({
                where: {login: 'admin'},
                defaults: {login: 'admin', password: 'admin'}
            }),
            db.User.findOrCreate({
                where: {login: 'admin2'},
                defaults: {login: 'admin2', password: 'admin2'}
            })
        ]);
}).then(() => {
    console.log('Admin user created');
}).catch((err) => {
    console.log('Error syncing database or creating admin users');
    console.log(err);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.title = "error page"
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
