var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.get('/', function(req, res) {
  res.send('hello world')
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