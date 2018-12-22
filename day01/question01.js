const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data1.txt';

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse the text data from the website
  let frequencies = R.split('\n', data);
  frequencies = R.map(n => parseInt(n,10), frequencies);
  
  // Part 1
  let total = R.reduce((acc, n) => acc + n, 0, R.clone(frequencies));
  console.log(total);
  
  // Part 2
  let runningTotal = [];
  let newFreq = 0;
  let idx = 0;
  let seq = 0;
  while (!R.contains(newFreq, runningTotal)) {
    runningTotal.push(newFreq);
    newFreq = newFreq + frequencies[idx]
    if (idx === frequencies.length-1) {
      seq++;
      console.log("through "+seq+" times");
    }
    idx = (idx+1 === frequencies.length) ? 0 : idx+1
  }
  console.log(newFreq);

})