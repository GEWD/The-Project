const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const model = require('./model');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var KEYS = require('../env/KEYS.js');

app.use( bodyParser.json() );
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: KEYS.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: KEYS.FB_APP_CLIENTID,
    clientSecret: KEYS.FB_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // let displayName = profile.displayName;
    // console.log('username', displayName);
    return cb(null, profile);
  }
));

// route for facebook authentication and login
app.get('/auth/facebook',
  passport.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated())
//       return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get('/', function(req, res) {
  res.send('hello world');
});

//To be used for testing and seeing requests
app.post('/testTripName', function(req, res) {
  //With the received request, use model function to submit the tripname to the database
  model.tripNameInsert(req.body.submittedTripName);
  res.send('Received request to /testTripNameServer');
});

app.post('/upload', function(req,res) {
  var body = req.body;
  console.log(body);
  res.sendStatus(201);
  //req.body should include receipt name, total, receipt_link;
  //should be an insert query

})

app.post('/upload/delete', function(req,res) {
  //req.body should include receipt name, total, receipt_link;
  //should be a delete query
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
