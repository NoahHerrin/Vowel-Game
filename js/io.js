var word = ['*'];
var ptr = 0;

window.addEventListener('keydown', function(e) {
  var keycode = e.keyCode;
  //input is valid if keycode between 65 and 90
  if (keycode >= 65 && keycode <= 90) {
    console.log("valid input: " + keycode);
    let letter = e.key;
    insertLetter(letter);
    console.log(word);
  } else {
    switch (keycode) {
      case 8:
        deleteLetter();
        break;
      case 37:
        moveLeft();
        ptr -= 1;
        break;
      case 39:
        moveRight();
        ptr += 1;
        break;
    }
    console.log(word);
  }
});

function swap(a, b) {
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
    console.log("swapping");
  }

}

function moveRight() {
  //make sure right neighbor index is valid
  if (ptr !== word.length - 1) {
    swap(ptr, ptr + 1);
    ptr += 1
  }
}

function moveLeft() {
  if (ptr !== 0) {
    swap(ptr, ptr - 1);
    ptr -= 1
  }
}

function deleteLetter() {
  console.log("trying to delete " + ptr);
  if (ptr !== 0) {
    console.log("confusion");
    word.splice(ptr - 1, 1);
    ptr -= 1;
  }
}