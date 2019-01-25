var word = ['*'];
var ptr = 0;

window.addEventListener('keydown', function(e) {
  var keycode = e.keyCode;
  //input is valid if keycode between 65 and 90
  if (keycode >= 65 && keycode <= 90) {

    let letter = e.key;
    insertLetter(letter);
  } else {
    switch (keycode) {
      case 8:
        deleteLetter();
        break;
      case 37:
        moveLeft();
        break;
      case 39:
        moveRight();
        break;
    }
  }
});

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

  if (ptr !== 0) {
    word.splice(ptr - 1, 1);
    ptr -= 1;
  }
}