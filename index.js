const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var Dictionary = require("oxford-dictionary");

var config = {
  app_id: "470defab",
  app_key: "00f29f6244f11fa9093c86e53cc2de3f",
  source_lang: "en"
};

var dict = new Dictionary(config);
const app = express();
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

//Home route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("New Connection");
});
//Word verification route
app.get('/word', function(req, res) {
  //parse word from request
  let word = req.url;
  word = req.url.slice(11, word.length);
  console.log(word);

  //verify that word is valid by sending a request to Oxford Dictionary API
  var lookup = dict.find(word);
  lookup.then(function(dict_response) {
      // word is valid
      var object = new Object();
      object.response = true;
      res.send(JSON.stringify(object));
    },
    function(err) {
      //word is invalid
      var object = new Object();
      object.response = false;
      res.send(JSON.stringify(object));
    });

});

app.listen(4000, function() {
  console.log("Starting Server");
});