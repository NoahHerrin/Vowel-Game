function test(word) {
  var term = 'duck'; // The id of your input was "begriff", not "name"
  var url = 'http://localhost:4000/vowel?term=' + word;
  // Now send a request to your Node program
  fetch(url).then(function(res) {
    // Res will be a Response object.
    // Use res.text() or res.json() to get the information that the Node program sent.
    var value = res.text().then(function(data) {
      var result = JSON.parse(data);
      console.log(result.response);
    });

  });
}

test("hello");
test("brokeasd");
test("fact");