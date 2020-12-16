import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

const lines = parseInputStringToLines(exampleInput)
// const lines = parseInputStringToLines(actualInput)

const input = lines[0].split(',').map(n => parseInt(n));
input.splice(0, 0, -1)

function playGame(startingNumbers, upTo) {
  const history = startingNumbers;
  const start = history.length;
  for (let round = start; round < upTo + 1; round++) {
    const mostRecentNumber = history[round - 1];
    const pastNumberRounds = findRoundOf(history.slice(0, round - 1), mostRecentNumber);

    let nextNumber = 0;
    if (pastNumberRounds.length > 0) {
      nextNumber = (round - 1) - pastNumberRounds.reverse()[0]
    }

    history.push(nextNumber)
  }

  return history.slice(1);
}

function findRoundOf(list, number) {
  return list.map((n, i) => number === n ? i : null).filter(Boolean);
}

const history = playGame(input, 2020);
console.log(history.reverse()[0])
