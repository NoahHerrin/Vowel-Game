var word = ['*'];
const vowels = ['a', 'e', 'i', 'o', 'u'];
var ptr = 0;
display = document.querySelector("#word");
window.addEventListener('keydown', function(e) {
  console.log("it worked");
  var term = e.keyCode;
  var url = 'http://localhost:3000/search?term=' + term;
  fetch(url).then(function(res) {
    // Res will be a Response object.
    // Use res.text() or res.json() to get the information that the Node program sent.
    var a = JSON.parse(res);
    console.log(a);
  });
  var keycode = e.keyCode;
  //input is valid if keycode between 65 and 90
  if (keycode >= 65 && keycode <= 90) {

    let letter = e.key;
    if (!isVowel(letter)) {
      insertLetter(letter);
      display.textContent = toString();
    } else {
      console.log("cockblocked")
    }

  } else {
    switch (keycode) {
      case 8:
        deleteLetter();
        display.textContent = toString();
        break;
      case 37:
        moveLeft();
        display.textContent = toString();
        break;
      case 39:
        moveRight();
        display.textContent = toString();
        break;
      case 13:
        console.log("Submit: " + toString());
        break
    }
  }
});

function toString() {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    //if (word[i] !== '*') {
    result += word[i];
    //}
  }
  return result;
}

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

function insertLetter(letter) {
  word.push(letter);
  let len = word.length - 1;
  while ((ptr) < len) {
    swap(len, len - 1);
    len = len - 1;
  }
  ptr++;

}

function moveRight() {
  //make sure right neighbor index is valid
  if (ptr !== word.length - 1) {

    swap(ptr, ptr + 1);
  }
}

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
generateVowels(3);
display.textContent = toString();