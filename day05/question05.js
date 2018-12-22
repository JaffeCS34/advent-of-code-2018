const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data5.txt';

const scan = letters => {
  let i = 0;
  while (i < letters.length-1) {
    if (shouldRemove(letters[i], letters[i+1])) {
      letters = R.concat(R.take(i, letters), R.takeLast(letters.length - i - 2, letters));
      i = Math.max(i-1, 0);
    } else {
      i++;
    }
  }
  return letters
}

const shouldRemove = (l1, l2) => {
  return l1.toLowerCase() === l2.toLowerCase() && l1 !== l2
}

fs.readFile(fileSpec, 'utf8', (err, data) => {


  // Part 1
  let letters = R.split('', data);
  letters = scan(letters);
  console.log('Number of units remaining: '+letters.length);

  // Part 2
  let remove = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  // let remove = ['a','b','c','d'];
  let results = [];
  for (let idx = 0; idx < remove.length; idx++) {
    let letters = R.split('', data);
    letters = R.filter(letter => letter.toLowerCase() !== remove[idx].toLowerCase(), letters)
    letters = scan(letters);
    results.push({letter: remove[idx], length: letters.length});
    console.log('Removed: '+remove[idx]+'; Number of units remaining: '+letters.length);
  }
  let min = {letter: '', length: 50000}
  R.forEach(res => {
    min = (res.length < min.length) ? {letter: res.letter, length: res.length} : min
  }, results)
  console.log(min);
})