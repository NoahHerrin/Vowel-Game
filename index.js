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

async function lookup(word, res) {
  var lookup = await dict.find(word, function(data, error) {
    if (error) {
      console.log(word + " is a real word");
      res.send({ response: "yes" });
    } else {
      //word is valid
      console.log(word + "is not a real word");
    }
  });

}


app.listen(4000, function() {
  console.log("Listening on port: 3000");
})