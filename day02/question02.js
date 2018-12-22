const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data2.txt';

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse the text data from the website
  let ids = R.split('\n', data);

  // Part 1
  let frequencies = R.reduce((acc, id) => {
    let letters = R.split('', id);
    let letterFrequencies = R.groupBy(let => let, letters)
    letterFrequencies = R.toPairs(letterFrequencies)
    letterFrequencies = R.map(it => ({letter: it[0], count: it[1].length}), letterFrequencies)
    letterFrequencies = R.filter(letter => letter.count === 2 || letter.count === 3, letterFrequencies)
    if (R.any(letter => letter.count === 2, letterFrequencies)) {
      acc.two++
    }
    if (R.any(letter => letter.count === 3, letterFrequencies)) {
      acc.three++
    }
    return acc;
  }, {two: 0, three: 0}, ids)
  console.log('Checksum: ' + (frequencies.two * frequencies.three));
  
  // Part 2
  for (let i=0; i<ids.length-1; i++) {
    for (let j=i+1; j<ids.length; j++) {
      let id1 = R.split('',ids[i]);
      let id2 = R.split('',ids[j]);
      let zipped = R.zip(id1, id2);
      let diffs = R.reduce((acc, id) => {
        acc += ((id[0] !== id[1]) ? 1 : 0)
        return acc;
      }, 0, zipped)
      if (diffs === 1) {
        console.log(ids[i])
        console.log(ids[j])
      }
    }
  }

  
})