const dictionary = require("oxford-dictionary-api");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');

var app_id = "470defab";
var app_key = "00f29f6244f11fa9093c86e53cc2de3f";
var dict = new dictionary(app_id, app_key);
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("New Connection");

  //res.send("did you say " + term + "?");
});
app.get("/vowel", function(req, res) {

  var temp = req.url;
  var term = req.url.slice(12, temp.length);
  lookup(term, res);
});

function lookup(word, res) {
  var lookup = dict.find(word);
  lookup.then((res) => {
      // stringify JSON object to see full structure in console log
      console.log(word + "is a real word");
      res.send({ response: "correct" });
    },
    (error) => {
      console.log(word + "not a real word");
      res.send({ response: "incorrect" });
    });
}

app.listen(4000, function() {
  console.log("Starting Server");
});