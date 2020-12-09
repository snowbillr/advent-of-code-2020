import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

// const lines = parseInputStringToLines(exampleInput).map(n => parseInt(n));
const lines = parseInputStringToLines(actualInput).map(n => parseInt(n));

// const PREAMBLE_LENGTH = 5;
const PREAMBLE_LENGTH = 25;

// additive factors = 2 `numbers` that add to `target
function findAdditiveFactors(numbers, target) {
  const additiveFactors = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] === numbers[j]) continue;

      if (numbers[i] + numbers[j] === target) {
        additiveFactors.push([numbers[i], numbers[j]]);
      }
    }
  }

  return additiveFactors;
}

function findInvalidNumber() {
  for (let i = PREAMBLE_LENGTH; i < lines.length; i++) {
    const preamble = lines.slice(i - PREAMBLE_LENGTH, i);
    const target = lines[i];

    const foundAdditiveFactors = findAdditiveFactors(preamble, target);
    if (foundAdditiveFactors.length === 0) {
      return target;
      break;
    }
  }
}

function findContiguousAdditiveFactors(target) {
  let numbers = lines.filter(n => n < target);

  for (let i = 0; i < numbers.length; i++) {
    const contiguousNumbers = [numbers[i]];
    for (let j = i + 1; j < numbers.length; j++) {
      contiguousNumbers.push(numbers[j]);
      const contiguousSum = contiguousNumbers.reduce((sum, n) => sum + n, 0);
      if (contiguousSum < target) continue;
      if (contiguousSum === target) return contiguousNumbers;
      else break;
    }
  }
}

const invalidNumber = findInvalidNumber(25)
const contiguousAdditiveFactors = findContiguousAdditiveFactors(invalidNumber);

const smallestContiguousNumber = contiguousAdditiveFactors.reduce((s, n) => n < s ? n : s);
const biggestContiguousNumber = contiguousAdditiveFactors.reduce((s, n) => n > s ? n : s);

console.log(smallestContiguousNumber + biggestContiguousNumber);

// Guess 1: 13 - wrong. That's the first number we're checking. Problem: wasn't converting the input strings to numbers.
// Guess 2: 144381670 - correct. Fixed bug from guess 1.
