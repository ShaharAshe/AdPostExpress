/**
 * Module dependencies.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');
var formRoute = require('./routes/formHandle');
var loginRoute = require('./routes/loginHandle');
var adminRoute = require('./routes/admin');
var newPostRoute = require('./routes/newPost');
var logoutRoute = require('./routes/logoutHandle');

// Create an Express application
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // Logging middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse Cookie header and populate req.cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Enable sessions
app.use(session({
    secret:"somesecretkey",
    resave: false, // Force save of session for each request
    saveUninitialized: false, // Save a session that is new, but has not been modified
    cookie: {maxAge: 10*60*1000 } // milliseconds!
}));

// Define routes
app.use('/', indexRouter); // Index route
app.use('/action', formRoute); // Route for handling form actions
app.use('/api', usersRouter); // API route
app.use('/login', loginRoute); // Route for login
app.use('/newPost', newPostRoute); // Route for creating new posts
app.use('/admin', adminRoute); // Admin route
app.use('/logout', logoutRoute); // Route for logout

// Database setup
const db = require('./models/index');
// Sync the database models with the actual database
db.sequelize.sync()
    .then(() => {
        console.log('Database Synced');
        // Create default admin users if they don't exist
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

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.title = "error page"
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
