const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data08.txt';

const PLAYER_COUNT = 479;
// const FINAL_MARBLE = 71035;
const FINAL_MARBLE = 92;

let model = {
  circle: [0,2,1],
  currentPlayer: 3,
  currentMarbleIndex: 1,
}
let points = {}

const insertMarble = (model, marbleNumberToAdd) => {
  let insertHere = (model.currentMarbleIndex + 2) % model.circle.length;
  model.circle.splice(insertHere, 0, marbleNumberToAdd)
  model.currentMarbleIndex = insertHere;
  return model;
}

const twentyThree = (model, marbleNumberToAdd) => {
  let toRemove = ((model.currentMarbleIndex - 7) + model.circle.length) % model.circle.length;
  let removed = model.circle.splice(toRemove, 1);
  model.currentMarbleIndex = toRemove;
  return marbleNumberToAdd + removed[0]
}

for (let marbleNumber = 3; marbleNumber < FINAL_MARBLE; marbleNumber++) {
  if (marbleNumber % 23 === 0) {
    let score = twentyThree(model, marbleNumber);
    if (!points[model.currentPlayer]) {
      points[model.currentPlayer] = 0;
    }
    points[model.currentPlayer] += score;
  } else {
    model = insertMarble(model, marbleNumber)
  }
  model.currentPlayer = (model.currentPlayer + 1) % PLAYER_COUNT
  console.log(model.circle);
}

let max = {
  points: 0,
  player: -1
}

max = R.reduce((max, player) => {
  if (points[player] > max.points) {
    max.points = points[player]
    max.player = player
  }
  return max;
}, max, R.keys(points))

console.log(max);

