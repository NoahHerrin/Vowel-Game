const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("New Connection");
});
app.get('/data', function(req, res) {
  var object = new Object();
  object.response = false;
  res.send(JSON.stringify(object));
});
app.listen(4000, function() {
  console.log("Starting Server");
});