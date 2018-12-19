const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data5.txt';

const scan = letters => {
  for (i=0; i<letters.length-1; i++) {
    if (letters[i].toLowerCase() === letters[i+1].toLowerCase() && letters[i] !== letters[i+1]) {
      letters = R.concat(R.take(i, letters), R.takeLast(letters.length - i - 2, letters));
      return letters
    }
  }
  return false
}

fs.readFile(fileSpec, 'utf8', (err, data) => {

  let newLetters;
  let letters = R.split('', data);
  while (newLetters !== false) {
    newLetters = scan(letters);
    if (newLetters !== false) {
      letters = newLetters
    }
  }
  console.log('Number of units remaining: '+letters.length);
})