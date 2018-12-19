const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data3.txt';

const toIndex = (x, y) => x*1000+y

const parseLine = R.split('\n');

const getTokens = R.map(line => R.split(' ', line));

const parseTokens = R.map(line => {
  return {
    claim: line[0],
    coord: R.init(line[2]),
    size: line[3]
  }
})

const parseCoords = R.map(line => {
  let coords = R.split(',', line.coord)
  let size = R.split('x', line.size)
  return {
    claim: line.claim,
    coord: {
      x: parseInt(coords[0],10),
      y: parseInt(coords[1],10)
    },
    size: {
      x: parseInt(size[0]),
      y: parseInt(size[1],10)
    }
  }
})

const parse = R.compose(parseCoords, parseTokens, getTokens, parseLine)

const addTrues = R.reduce((acc, square) => acc+((square > 1) ? 1 : 0), 0)

const markSquaresInQuilt = R.reduce((quilt, claim) => {
  for (x = claim.coord.x; x < claim.coord.x + claim.size.x; x++) {
    for (y = claim.coord.y; y < claim.coord.y + claim.size.y; y++) {
      quilt[toIndex(x, y)]++
    }
  }
  return quilt;
})

const mapToRect = R.map(claim => {
  return {
    rect: {
      left: claim.coord.x,
      right: claim.coord.x + claim.size.x,
      top: claim.coord.y + claim.size.y,
      bottom: claim.coord.y
    },
    overlap: false,
    number: claim.claim
  }
})

const intersectRect = (r1, r2) => {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.bottom > r1.top ||
    r2.top < r1.bottom);
}

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse the text data from the website
  let claims = parse(data)

  // Part 1
  quilt = R.map(square => 0, R.range(0, 1000*1000));
  quilt = markSquaresInQuilt(quilt, claims)
  console.log("Overlapping squares: "+addTrues(quilt));

  // Part 2
  claims = mapToRect(claims)

  for (i=0; i<claims.length-1; i++) {
    for (j=i+1; j<claims.length; j++) {
      // console.log(i+' '+j)
      if (intersectRect(claims[i].rect, claims[j].rect)) {
        claims[i].overlap = true
        claims[j].overlap = true
      }
    }
  }

  R.forEach(claim => {
    if (!claim.overlap) {
      console.log("Claim "+claim.number+" doesn't overlap any other claim!")
    }
  }, claims)
})