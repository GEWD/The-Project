const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const model = require('./model');
const connect = require('./db/dbConnect');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const KEYS = require('../env/KEYS.js');
const fileUpload = require('express-fileupload');
const app = express();

//Google cloud vision setup:
const gVision = require('./api/vision.js');


app.use( bodyParser.json() );
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: KEYS.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: KEYS.FB_APP_CLIENTID,
  clientSecret: KEYS.FB_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
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

app.post('/upload', function(req, res) {
  //req.body should include receipt name, total, receipt_link;
  //should be an insert query
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.sampleFile;
  console.log(sampleFile);
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(__dirname + '/temp/filename.jpg', function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });

});

app.post('/upload/delete', function(req, res) {
  //req.body should include receipt name, total, receipt_link;
  //should be a delete query
});

app.post('/vision', function(req, res) {
  let image = req.body.receipt || './api/test.jpg';
  gVision.promisifiedDetectText(image)
  .then(function(results) {
    res.send(results);
  })
  .error(function(e) {
    console.log('Error received in appPost, promisifiedDetectText:', e);
  });
});

app.post('/test', function(req, res) {
  // res.send(image);
  res.send(__dirname);
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
