/*
 *
 * Project: Vowel-Quest or Vowel-Rush
 * Author: Noah Herrin
 * Started: Jan 24 2019
 *
 */

// import import packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const checkWord = require('check-word'),
  words = checkWord('en');


const app = express();
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Home route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("New Connection");
});

// Word verification route
app.get('/word', function(req, res) {
  // Parse request
  let word = req.url.slice(11, req.url.length);

  // Validate word and send response as JSON data
  let object = new Object();
  object.response = words.check(word);
  res.send(JSON.stringify(object));

});

//setup server
app.listen(4000, function() {
  console.log("Starting Server");
});