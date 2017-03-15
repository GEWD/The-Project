var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.get('/', function(req, res) {
  res.send('hello world');
});

//To be used for testing and seeing requests
app.post('/test', function(req, res) {
  console.log('Received request aimed at /test, request is currently:', req, '///////RequestBody is:', req.body);
  res.send('Server received test');
});







app.listen(3000, function() {
  console.log('listening on port 3000!');
});

