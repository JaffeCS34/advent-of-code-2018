const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data4sorted.txt';

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse the text data from the website
  let log = R.split('\n', data);
  // log = R.sort((a,b) => (a < b) ? -1 : 1, log)
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
  
  const initMinutes = () => R.map(n => 0, R.range(0, 60));

  // Part 1
  let currentGuard = '';
  let startSleep = -1;
  let guardMinutes = R.reduce((guardMinutes, item) => {
    if (item.textType === 'guard') {
      currentGuard = item.guard;
      if (!guardMinutes[currentGuard]) {
        guardMinutes[currentGuard] = initMinutes();
      }
    } else if (item.textType === 'sleep') {
      startSleep = parseInt(item.time, 10);
    } else if (item.textType === 'wake') {
      let minutes = R.range(startSleep, parseInt(item.time,10))
      guardMinutes[currentGuard] = R.reduce((arr, min) => {
        arr[min]++;
        return arr;
      }, guardMinutes[currentGuard], minutes);
    }
    return guardMinutes;
  }, {}, log)
  
  // Find total minutes asleep
  let totalMinutes = R.map(guardArr => {
    return R.reduce((total, min) => {
      return total + min
    }, 0, guardArr)
  }, guardMinutes)
  
  let guardWithMax = '';
  let maxMins = 0;
  R.forEach(guard => {
    if (totalMinutes[guard] > maxMins) {
      maxMins = totalMinutes[guard];
      guardWithMax = guard;
    }
  }, R.keys(totalMinutes));
  console.log("Guard: "+guardWithMax);
  console.log("Total minutes: "+maxMins);
  
  let maxMinIdx = 0;
  maxMins = 0;
  R.forEach(minIdx => {
    if (guardMinutes[guardWithMax][minIdx] > maxMins) {
      maxMinIdx = minIdx;
      maxMins = guardMinutes[guardWithMax][minIdx]
    }
  }, R.range(0,60))
  console.log('Max time at minute: '+maxMinIdx)

  // Part 2
  let maxMinutes = 0;
  let maxMinutesIdx = 0;
  let maxGuard = '';
  R.forEach(guard => {
    for (let min=0; min<60; min++) {
      if (guardMinutes[guard][min] > maxMinutes) {
        maxMinutes = guardMinutes[guard][min];
        maxMinutesIdx = min
        maxGuard = guard
      }
    }
  }, R.keys(guardMinutes))
  console.log('Max minutes: '+maxMinutes);
  console.log('Max minute number: '+maxMinutesIdx);
  console.log('Max guard: '+maxGuard);
  console.log('Product: '+(R.tail(maxGuard) * maxMinutesIdx));
})