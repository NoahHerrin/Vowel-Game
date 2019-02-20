var submitted = false;

function switch_true() {
  let url = "http://localhost:4000/true"
  fetch(url).then(function(res) {
    // Res will be a Response object.
    // Use res.text() or res.json() to get the information that the Node program sent.
    var value = res.text().then(function(data) {
      var result = JSON.parse(data);
      if (result.response == true) {
        document.querySelector("#word").style.color = "green";
      } else {
        document.querySelector("#word").style.color = "red";
      }


    });

  });
}

function switch_false() {
  let url = "http://localhost:4000/false";
  fetch(url).then(function(res) {
    // Res will be a Response object.
    // Use res.text() or res.json() to get the information that the Node program sent.
    var value = res.text().then(function(data) {
      var result = JSON.parse(data);
      if (result.response == false) {
        document.querySelector("#word").style.color = "red";
      } else {
        document.querySelector("#word").style.color = "red";
      }


    });

  });

}

var word = ['*'];
const vowels = ['a', 'e', 'i', 'o', 'u'];
var ptr = 0;
display = document.querySelector("#word");
window.addEventListener('keydown', function(e) {

  var keycode = e.keyCode;
  //input is valid if keycode between 65 and 90
  if (keycode >= 65 && keycode <= 90) {

    let letter = e.key;
    if (!isVowel(letter)) {
      newTry();
      insertLetter(letter);
      display.textContent = displayWord();
    } else {}

  } else {
    switch (keycode) {
      case 8:
        deleteLetter();
        newTry();
        display.textContent = displayWord();
        break;
      case 37:
        moveLeft();
        display.textContent = displayWord();
        break;
      case 39:
        moveRight();
        display.textContent = displayWord();
        break;
      case 13:
        console.log("Submit: " + displayWord());
        validateWord(toString());
        submitted = true;
        break
    }
  }
});
//Returns the value of the word excluding the asterisk
function toString() {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== '*') {
      result += word[i];
    }
  }
  return result;
}
//Returns the value of the word including the asterisk
function displayWord() {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    //if (word[i] !== '*') {
    result += word[i];
    //}
  }
  return result;
}
//Swaps to elements in the word, and updates necessary pointers
function swap(a, b) {
  if (a == ptr) {
    ptr = b;
  } else if (b == ptr) {
    ptr = b;
  }
  var temp = word[a];
  word[a] = word[b];
  word[b] = temp;
}
//Inserts new letter into word
function insertLetter(letter) {
  word.push(letter);
  let len = word.length - 1;
  while ((ptr) < len) {
    swap(len, len - 1);
    len = len - 1;
  }
  ptr++;

}
//If new index would not exceed the length of the array, asterisk is moved one space right
function moveRight() {
  //make sure right neighbor index is valid
  if (ptr !== word.length - 1) {

    swap(ptr, ptr + 1);
  }
}
//If new index would not exceed the length of the array, asterisk is moved one space left
function moveLeft() {
  //moving asterisk to a smaller index
  if (ptr - 1 !== -1) {
    swap(ptr, ptr - 1);
  }
}

function deleteLetter() {
  if (ptr !== 0 && !isVowel(word[ptr - 1])) {
    word.splice(ptr - 1, 1);
    ptr -= 1;
  }
}

function generateVowels(difficulty) {
  for (let i = 0; i < difficulty; i++) {
    let i = Math.floor(Math.random() * (vowels.length - 1));
    word.push(vowels[i]);
  }


}

function isVowel(letter) {
  let result = false;
  for (let i = 0; i < vowels.length; i++) {
    if (letter === vowels[i]) {
      result = true;
    }
  }
  return result;
}

function validateWord(word) { // The id of your input was "begriff", not "name"
  var url = 'http://localhost:4000/word?term=' + word;
  // Now send a request to your Node program
  fetch(url).then(function(res) {
    // Res will be a Response object.
    // Use res.text() or res.json() to get the information that the Node program sent.
    var value = res.text().then(function(data) {
      var result = JSON.parse(data);
      console.log(result.response);
      if (result.response == true) {
        document.querySelector("#word").style.color = "green";
      } else {
        document.querySelector("#word").style.color = "red";
      }

    });

  });
}
//Changes word color back to black when the start a new attempt
function newTry() {
  if (submitted === true) {
    document.querySelector("#word").style.color = "black";
  }
}
generateVowels(2);
display.textContent = displayWord();