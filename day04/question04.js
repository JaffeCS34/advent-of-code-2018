const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data4.txt';

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse the text data from the website
  let log = R.split('\n', data);
  log = R.sort((a,b) => (a < b) ? -1 : 1, log)
  log = R.map(line => {
    return R.split(']', line)
  }, log)
  log = R.map(line => {
    return {
      time: R.tail(line[0]),
      text: R.tail(line[1])
    }    
  }, log)
  log = R.map(obj => {
    let textType = ''
    let guard = ''
    if (obj.text === 'falls asleep') {
      textType = 'sleep'
    } else if (obj.text === 'wakes up') {
      textType = 'wake'
    } else {
      textType = 'guard'
      let guardArr = R.split(' ', obj.text)
      guard = guardArr[1]
    }
    return {
      time: R.takeLast(2, obj.time),
      textType,
      guard
    }
  }, log)

})