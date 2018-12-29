const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data10.txt';

const POS_X = 10;
const POS_Y = 18;
const POS_LEN = 6;

const DIR_X = 36;
const DIR_Y = 40;
const DIR_LEN = 2;

fs.readFile(fileSpec, 'utf8', (err, data) => {

  data = R.split("\n", data);

  let vectors = R.map(line => {
    return {
      xPos: line.substr(POS_X, POS_LEN),
      yPos: line.substr(POS_Y, POS_LEN),
      xDir: line.substr(DIR_X, DIR_LEN),
      yDir: line.substr(DIR_Y, DIR_LEN)
    }
  }, data)

  console.log(vectors);

})