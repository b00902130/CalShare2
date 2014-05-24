var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var http = require('http');
var path = require('path');
var portNum = process.env.PORT || 3003;
var mongo = require('mongoskin');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/robotserver';
//var db = mongo.db(mongoUri, {native_parser:true});
// var db = require('./db');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var app = express();
// require('./config/passport')(passport); // pass passport for configuration

mongoose.connect(configDB.url); // connect to our database

// all environments

app.set('port', portNum);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

passport.use(new GoogleStrategy({
    returnURL: 'http://www.google.com/auth/google/return',
    realm: 'http://www.google.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.load);
app.get('/index2', index.load2);

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
// app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
// app.get('/auth/google/return', 
//   passport.authenticate('google', { successRedirect: '/',
//                                     failureRedirect: '/index2' }));

// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

