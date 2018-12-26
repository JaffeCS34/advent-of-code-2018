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
  
  let closestPoints = R.map(p => R.map(c => 0, R.range(0, maxCoords.maxY)), R.range(0, maxCoords.maxX))
  const reduceIdx = R.addIndex(R.reduce)
  const mapIdx = R.addIndex(R.map)

  // Part 1
  closestPoints = mapIdx((row, x) => {
    return mapIdx((cell, y) => {
      return reduceIdx((acc, point, idx) => {
        let dx = getDistance(x, y, point.x, point.y);
        if (acc.dx === null) {
          acc.dx = dx;
          acc.pt = idx
        } else {
          if (dx < acc.dx) {
            acc.dx = dx
            acc.pt = idx
          }
        }
        return acc
      }, {dx: null, pt: -1}, coords)
    }, row)
  }, closestPoints);
  
  let spacesForCells = R.map(a => 0, R.range(0, coords.length))
  for (let x=0; x<maxCoords.maxX; x++) {
    for (let y=0; y<maxCoords.maxY; y++) {
      spacesForCells[closestPoints[x][y].pt]++;
    }
  }

  // Part 2

    
})