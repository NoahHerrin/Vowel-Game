/*
 * Client code for Vowel-Rush or Vowel-Quest
 */

// Global Variables
var submitted = false;
var vowelsOnly = true;
var score = 0;
var word = [];
var gameover = false;

const vowels = ['a', 'e', 'i', 'o', 'u'];
var ptr = 0;
var display = document.querySelector("#word");

window.addEventListener('keydown', function(e) {
  var keycode = e.keyCode;
  //input is valid if keycode between 65 and 90
  if (keycode >= 65 && keycode <= 90) {

    let letter = e.key;
    if (!isVowel(letter)) {
      addLetter(letter);
      updateWord();
    }

  } else {
    switch (keycode) {
      case 8:
        deleteLetter();
        updateWord();
        break;
      case 37:
        moveLeft();
        updateWord();
        break;
      case 39:
        moveRight();
        updateWord();
        break;
      case 13:
        validateWord(toString(word, false));
        submitted = true;
        break;
      case 32:
        //resetWord();
        updateWord();
        break;
    }
  }
});
//Returns the value of the word excluding the asterisk
function toString(list, includecursor) {
  if (list === null) return;
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (i !== ptr || includecursor) {
      result += list[i];
    }

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
function addLetter(letter) {
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

// Generates a new set of vowels of size n
function generateVowels(difficulty) {
  ptr = 0;
  word = ["_"];
  for (let i = 0; i < difficulty; i++) {
    let i = Math.floor(Math.random() * (vowels.length - 1));
    word.push(vowels[i]);
  }
  console.log(word);

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
      submitted = true;
      if (result.response == true) {
        updateWordStatus("correct");
        document.querySelector("#score").textContent = "Score: " + (++score);
        setTimeout(function() {
          submitted = true;
          generateVowels(2);
          updateWord();
          updateWordStatus("default");
        }, 1000);
      } else {
        updateWordStatus("incorrect");
        setTimeout(function() {
          submitted = true;
          updateWordStatus("default");
        }, 1000)
      }

    });

  });

}
/*
 * Takes a status parameter and updates the color of the text appropriatly
 * options:
 *  incorrect
 *  correct
 *  default
 */
function updateWordStatus(status) {
  document.querySelector("#word").classList = 'word' + ' ' + status;
  document.querySelector("#word").classList = 'word' + ' ' + status;
}


function updateWord() {
  console.log(word);
  word[ptr] = "<span style='color: #FFFFFF '>_</span>"
  document.querySelector("#word").innerHTML = toString(word, true);
  word[ptr] = "_";
  console.log(word);
}

function resetWord() {
  let new_word = ["_"];
  for (let i = 0; i < word.length; i++) {
    if (isVowel(new_word[i])) {
      new_word.push(new_word[i]);
    }
  }
  word = new_word;
}

function main() {
  generateVowels(2);
  updateWord();

  let t = 10;
  let id = window.setInterval(function() {
    document.querySelector("#time").textContent = "Time: " + t;
    t--;
    if (t === -1) {
      window.clearInterval(id);
      gameover = true;
      if (score !== 1) {
        document.querySelector("#word").innerHTML = "You scored " + score +
          " Points!"
      } else {
        document.querySelector("#word").innerHTML = "You scored " + score +
          " Point!"
      }

    }
  }, 1000);
}


main();