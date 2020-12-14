import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import example2Input from './example-2.js';
import actualInput from './actual-input.js';

// const lines = parseInputStringToLines(exampleInput)
// const lines = parseInputStringToLines(example2Input)
const lines = parseInputStringToLines(actualInput)

const DEBUG = false;


/* Part 1

const targetDeparture = parseInt(lines[0]);
const busIds = lines[1].split(',').filter(v => v != 'x').map(v => parseInt(v));

function findSurroundingMultiples(target, base) {
  const before = Math.floor(target / base);
  const after = Math.ceil(target / base);

  return [base * before, base * after];
}

const surroundingBusDepartures = busIds.reduce((departures, busId) => {
  departures[busId] = findSurroundingMultiples(targetDeparture, busId)
  return departures;
}, {});

console.log(surroundingBusDepartures)

const bestBus = Object.entries(surroundingBusDepartures).reduce((closestDeparture, [busId, schedule]) => {
  const availableDeparture = schedule[1];
  const waitTime = availableDeparture - targetDeparture;
  if (waitTime < closestDeparture.waitTime) {
    return {
      busId: parseInt(busId),
      waitTime
    }
  } else {
    return closestDeparture
  }
}, { busId: 0, waitTime: Infinity });

console.log(bestBus);
console.log(bestBus.busId * bestBus.waitTime)

*/

/* Part 2 */

let busOffsets = lines[1].split(',').map((id, offset) => id === 'x' ? 1 : id).map(v => parseInt(v));
console.log('initial', busOffsets)

function findSequentialMultiples(initialList, minimumFirst = 0) {
  let list = Array.from(initialList);

  for (let i = 0; i < list.length; i++) {
   if (list[i] < minimumFirst) {
     list[i] *= Math.floor(minimumFirst / list[i])
   }
  }
  // console.log(list);

  // const maxIterations = 9999999;
  const maxIterations = 100;
  let currentIteration = 0;
  while(!isListSequential(list) && currentIteration++ < maxIterations) {
    if (currentIteration > maxIterations - 10) console.log(currentIteration, list)

    for (let i = 0; i < list.length - 1; i++) {
      const sequentialPair = findSequentialMultiplePair(
        { value: list[i], factor: busOffsets[i] },
        { value: list[i + 1], factor: busOffsets[i + 1] }
      );

      list[i] = sequentialPair[0];
      list[i + 1] = sequentialPair[1];
    }
    // console.log(list)

    /*
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < i; j++) {
        // console.log(i, j, list)

        if (list[j] + 1 === list[i]) continue;

        if (list[j] < list[i]) {
          const difference = Math.abs(list[j] - list[i]);
          const factor = Math.ceil(difference / busOffsets[j]);
          list[j] += factor * busOffsets[j];
        }
        if (list[j] >= list[i]) {
          const difference = Math.abs(list[i] - list[j]);
          const factor = Math.ceil(difference / busOffsets[i]);
          list[i] += factor * busOffsets[i];
        }
        if (list[i] === list[j]) {
          list[i] += busOffsets[i]
        }
      }

      for (let j = i + 1; j < list.length; j++) {
        if (list[j] < list[i]) {
          // bump j
        }
      }
    }
    */

    /*
    let lastSequentialIndex = 0;
    let lastSequentialValue = list[0];
    for (let i = 1; i < list.length; i++) {
      if (lastSequentialValue + 1 === list[i]) {
        lastSequentialIndex = i;
        lastSequentialValue = list[i];
      }
    }

    for (let i = lastSequentialIndex + 1; i < list.length; i++) {
      if (list[i] < lastSequentialValue) {
        const difference = lastSequentialValue
      }
    }


    /*
    let firstNonSequentialIndex = 0;
    for (let i = 1; i < list.length; i++) {
      const previous = list[i - 1];
      if (list[i] !== previous + 1) {
        firstNonSequentialIndex = i;
        break;
      }
    }

    const first = list[firstNonSequentialIndex - 1];
    const second = list[firstNonSequentialIndex];

    if (first < second) {
      const difference = second - first;
      const factor = Math.ceil(difference / busOffsets[firstNonSequentialIndex - 1]);
      list[firstNonSequentialIndex - 1] += factor * busOffsets[firstNonSequentialIndex - 1];
    } else if (first > second) {
      const difference = first - second;
      const factor = Math.ceil(difference / busOffsets[firstNonSequentialIndex]);
      list[firstNonSequentialIndex] += factor * busOffsets[firstNonSequentialIndex];
    }

    if (list[firstNonSequentialIndex] === list[firstNonSequentialIndex - 1]) {
      list[firstNonSequentialIndex] += busOffsets[firstNonSequentialIndex];
    }

    /*
    for (let i = 0; i < list.length - 1; i++) {
      // if they are sequential, move on
      // if list[i] < list[i + 1], multiply list[i] until it is either sequential or greater than list[i+1]
      // if list[i + 1] < list[i], multiply list[i + 1] until it is either sequential or greater than list[i]

      if (list[i] + 1 === list[i + 1]) {
        continue;
      }

      if (list[i] <= list[i + 1]) {
        list[i] += Math.ceil((list[i + 1] - list[i]) / busOffsets[i]) * busOffsets[i]
      }
    }

    for (let i = list.length - 1; i > 0; i--) {
      if (list[i] - 1 === list[i - 1]) {
        continue;
      }

      if (list[i] <= list[i - 1]) {
        list[i] += Math.ceil((list[i - 1] - list[i]) / busOffsets[i]) * busOffsets[i]
      }
    }

    for (let i = 0; i < list.length - 1; i++) {
      if (list[i] === list[i + 1]) {
        list[i + 1] += busOffsets[i + 1]
      }
    }
    */
  }

  console.log(`exited on iteration ${currentIteration}/${maxIterations}`)
  return list;
}

// a = { value, factor }
function findSequentialMultiplePair(a, b) {
  DEBUG && console.log({...a}, {...b})
  if (a.value + 1 === b.value) {
    DEBUG && console.log(a.value, b.value)
    return [a.value, b.value];
  }

  if (a.value === b.value) {
    b.value += b.factor;
  }

  if (a.factor === 1) {
    if (a.value < b.value) {
      DEBUG && console.log(b.value - 1, b.value)
      return [b.value - 1, b.value];
    } else if (a.value > b.value) {
      const diff = a.value - b.value;
      b.value += Math.max(1, Math.floor(diff / b.factor)) * b.factor;

      DEBUG && console.log(b.value - 1, b.value)
      console.log('HERE 1', b.value - 1, b.value)
      return [b.value - 1, b.value];
    }
  }

  if (b.factor === 1) {
    if (b.value < a.value) {
      DEBUG && console.log(a.value, a.value + 1)
      return [a.value, a.value + 1];
    } else if (b.value > a.value) {
      const diff = b.value - a.value;
      a.value += Math.max(1, Math.floor(diff / a.factor)) * a.factor;

      DEBUG && console.log(a.value, a.value + 1)
      console.log('HERE 2', a.value, a.value - 1)
      return [a.value, a.value + 1];
    }
  }

  while (a.value + 1 != b.value) {
    const difference = Math.abs(a.value - b.value);

    if (a.value < b.value) {
      a.value += Math.max(Math.floor(difference / a.factor), 1) * a.factor;
    } else if (a.value > b.value) {
      b.value += Math.max(Math.floor(difference / b.factor), 1) * b.factor;
    } else {
      b.value += b.factor;
    }
  }

  DEBUG && console.log(a.value, b.value)
  return [a.value, b.value]
}

function isListSequential(list) {
  let isSequential = true;
  for (let i = 0; i < list.length - 1; i++) {
    isSequential = isSequential && (list[i] + 1 === list[i + 1]);
  }

  return isSequential;
}

const sequentialMultiples = findSequentialMultiples(busOffsets, 100000000000000);
console.log('final', sequentialMultiples)

// console.log(findSequentialMultiplePair({ value: 3196, factor: 17 }, { value: 3418, factor: 1 }))
