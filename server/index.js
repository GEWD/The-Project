const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const model = require('./model');

var db = require('./db/index.js')

app.use( bodyParser.json() );
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));

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

