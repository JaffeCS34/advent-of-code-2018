const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data6.txt';

const getDistance = (x1, y1, x2, y2) => Math.abs(x2-x1) + Math.abs(y2-y1);

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse data
  let coords = R.split('\n', data);
  coords = R.map(c => {
    let [x,y] = R.split(',', c)
    return {x: parseInt(x,10), y: parseInt(y,10)}
  }, coords)
  
  // Find the maximum x and y coordinates
  let maxCoords = R.reduce((max, coord) => {
    return {
      maxX: Math.max(max.maxX, coord.x),
      maxY: Math.max(max.maxY, coord.y)
    }
  }, {maxX:0, maxY: 0}, coords)
  
  console.log(maxCoords);
  // Part 1

  // Part 2

    
})