const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const model = require('./model');

app.use( bodyParser.json() );
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));

app.get('/', function(req, res) {
  res.send('hello world');
});

//To be used for testing and seeing requests
app.post('/test', function(req, res) {
  console.log('Received request aimed at /test, request is currently:', req, '///////RequestBody is:', req.body);
  //With the received request, use model function to submit the tripname to the database
  model.tripNameInsert(req.body.submittedTripName);
  res.send('Server received test');
});







app.listen(3000, function() {
  console.log('listening on port 3000!');
});

