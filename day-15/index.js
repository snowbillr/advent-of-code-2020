import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

import { History } from './History.js';

// const lines = parseInputStringToLines(exampleInput)
const lines = parseInputStringToLines(actualInput)

const input = lines[0].split(',').map(n => parseInt(n));
// input.splice(0, 0, -1)

function playGame(startingNumbers, upTo) {
  const history = new History();
  startingNumbers.forEach((n, i) => {
    history.push(n, i + 1);
  });

  let nextNumber = -1;
  for (let currentRound = startingNumbers.length + 1; currentRound <= upTo; currentRound++) {
    let previousNumber = history.numberFor(currentRound - 1);
    const previousNumberRounds = history.numbers[previousNumber];

    if (previousNumberRounds.length <= 1) {
      nextNumber = 0;
    } else {
      nextNumber = previousNumberRounds[0] - previousNumberRounds[1];
    }

    history.push(nextNumber, currentRound);
  }

  console.log(nextNumber)
  return history;
}

let startTime = Date.now();
   playGame(input, 30000000);
// playGame(input, 30000000);
let duration = Date.now() - startTime;
console.log('duration', duration)
