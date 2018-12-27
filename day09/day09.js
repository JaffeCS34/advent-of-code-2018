const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data08.txt';

const players = 479;
const finalMarble = 71035;

let circle = [0,2,1];
let currentMarbleIndex = 1;
let struct = {
  circle,
  currentMarbleIndex
}
let points = {}

const insertMarble = (marbleToAdd) => {
  let insertHere = (currentMarbleIndex + 2) % circle.length;
  circle.splice(insertHere, 0, marbleToAdd)
  currentMarbleIndex = insertHere;
}

const twentyThree = (nextMarble) => {
  let toRemove = ((currentMarbleIndex - 7) + circle.length) % circle.length;
  let removed = circle.splice(toRemove, 1);
  currentMarbleIndex = (toRemove + 1) % circle.length;
  return nextMarble + removed[0]
}

for (let nextMarble = 3; nextMarble < players; nextMarble++) {
  if (nextMarble % 23 === 0) {
    let score = twentyThree(nextMarble);
    if (!points[nextMarble]) {
      points[nextMarble] = 0;
    }
    points[nextMarble] += score;
  } else {
    insertMarble(nextMarble);
  }
}

console.log(points);

