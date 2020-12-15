import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import example2Input from './example-2.js';
import actualInput from './actual-input.js';

// const lines = parseInputStringToLines(exampleInput)
const lines = parseInputStringToLines(example2Input)
// const lines = parseInputStringToLines(actualInput)

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

/* ATTEMPT 1
function findSequentialMultiples(factors, minimumFirst = 0) {
  let list = Array.from(factors);

  let relevantOffsets = list.reduce((offsets, value, index) => {
    if (value > 1) {
      offsets.push(index);
    }

    return offsets;
  }, []);
  console.log('relevant offsets', relevantOffsets)

  // transform to minimium
  for (let i = 0; i < list.length; i++) {
    if (list[i] < minimumFirst) {
      list[i] *= Math.floor(minimumFirst / list[i])
    }
  }

  const maxIterations = 999999;
  let currentIteration = 0;
  while(!isListSequential(list) && currentIteration++ < maxIterations) {
    if (currentIteration > maxIterations - 10) {
      console.log(currentIteration, list.map((v, i) => relevantOffsets.includes(i) ? v : '.'))
    }

    for (let i = 0; i < list.length - 1; i++) {
      if (relevantOffsets.includes(i)) {
        const subsequentIndex = relevantOffsets[relevantOffsets.findIndex(v => v === i) + 1];
        const [a, b] = findSequentialMultiplePair(
          { value: list[i], factor: factors[i] },
          { value: list[subsequentIndex], factor: factors[subsequentIndex] },
          subsequentIndex - i
        );
        list[i] = a;
        list[subsequentIndex] = b;
      } else {
        list[i] = list[i - 1] + 1;
      }
    }
  }

  console.log(`exited on iteration ${currentIteration}/${maxIterations}`)
  return list;
}

// a = { value, factor }
function findSequentialMultiplePair(a, b, distance) {
  //  console.log({...a}, {...b}, distance)
  if (a.value + distance === b.value) {
    DEBUG && console.log(a.value, b.value)
    return [a.value, b.value];
  }

  // if (a.factor === 1) {
  //   if (a.value < b.value) {
  //     DEBUG && console.log(b.value - distance, b.value)
  //     return [b.value - distance, b.value];
  //   } else if (a.value > b.value) {
  //     const diff = a.value - b.value;
  //     b.value += Math.max(1, Math.floor(diff / b.factor)) * b.factor;

  //     DEBUG && console.log(b.value - distance, b.value)
  //     return [b.value - distance, b.value];
  //   }
  // }

  // if (b.factor === 1) {
  //   if (b.value < a.value) {
  //     DEBUG && console.log(a.value, a.value + distance)
  //     return [a.value, a.value + distance];
  //   } else if (b.value > a.value) {
  //     const diff = b.value - a.value;
  //     a.value += Math.max(1, Math.floor(diff / a.factor)) * a.factor;

  //     DEBUG && console.log(a.value, a.value + distance)
  //     return [a.value, a.value + 1];
  //   }
  // }

  while (a.value + distance != b.value) {
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

// const sequentialMultiples = findSequentialMultiples(busOffsets)//, 100000000000000);
// console.log('final', sequentialMultiples)
const sequentialMultiples = findSequentialMultiples([1789,37,47,1889]);
console.log('final', sequentialMultiples)
*/

/* ATTEMPT 2 */


class MultiplesProvider {
  constructor(factors) {
    this.multiples = factors.reduce((hash, factor) => {
      hash[factor] = this.generateMultiplesList(factor, 0, 1000);
    });

    return hash;
  }

  for(factor, minimum) {
    this.multiples[factor] = this.generateMultiplesList(factor, minimum, 1000);
    return this.multiples[factor];
  }

  generateMultiplesList(factor, minimum, count) {
    const firstPastMinimum = Math.max(Math.ceil(minimum / factor), 1) * factor;

    return Array.from({ length: count }, (v, i) => i * factor + firstPastMinimum)
  }
}

function isListSequential(list) {
  let isSequential = true;
  for (let i = 0; i < list.length - 1; i++) {
    isSequential = isSequential && (list[i] + 1 === list[i + 1]);
  }

  return isSequential;
}

function hasSequencePath(lists, startingIndex) {

}

function findSequentialMultiples(factors) {
  let list = [...factors];

  let minValue = Math.min(...list);
  let multiplesLists = list.map((min, i) => generateMultiplesList(factors[i], Math.max(min, minValue), 1000));

  const maxIteration = 100;
  let currentIteration = 0;

  while(currentIteration++ < maxIteration) {
    const sequencesByIndex = [];
    for (let offset = 0; offset < list.length - 1; offset++) {
      const offsetMultiples = multiplesLists[i];

      offsetMultiples.forEach((o1, i1) => {

      });
    }
  }

  return list;
}

console.log(findSequentialMultiples(busOffsets));

// console.log(generateMultiplesList(7, 0, 10))
