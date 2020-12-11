import { parseInputStringToLines } from '../input-utils.js';

import exampleInput1 from './example-input-1.js';
import exampleInput2 from './example-input-2.js';
import actualInput from './actual-input.js';

// const lines = parseInputStringToLines(exampleInput1).map(n => parseInt(n));
// const lines = parseInputStringToLines(exampleInput2).map(n => parseInt(n));
const lines = parseInputStringToLines(actualInput).map(n => parseInt(n));

const possibleInputDifferences = [1, 2, 3]; // all negative
const extraDeviceOutputDifference = +3;
const chargingOutletOutput = 0;

const inputRatings = lines.sort((a, b) => a - b)
inputRatings.push(lines[lines.length - 1] + extraDeviceOutputDifference);
inputRatings.splice(0, 0, 0);

function getDifferentialsCount() {
  const differentialsCount = {
    1: 0,
    2: 0,
    3: 0
  };

  let currentRating = chargingOutletOutput;
  for (let i = 0; i < inputRatings.length; i++) {
    const nextRating = inputRatings[i];

    for (let j = 0; j < possibleInputDifferences.length; j++) {
      const inputDifference = possibleInputDifferences[j];
      if (currentRating + inputDifference === nextRating) {
        differentialsCount[inputDifference] += 1;
        currentRating = nextRating;
        break;
      }
    }
  }

  return differentialsCount;
}

// ============Part 1
// const differentials = getDifferentialsCount();
// console.log(differentials);

// Guess 1: 912 - too low
// Guess 2: 2484 - correct - I was using the wrong input data somehow

// =========Part 2

/*
 * We know that every number in the list is possible to get to
 * If we find out how many ways there are to get to each number, we can multiply them all together to get the total possible number of arrangements
 *
 * Test for example 1
 * ways to get to....
 * 1: 1
 * 4: 1
 * 5: 1
 * 6: 2
 * 7: 4
 * 10: 4
 * 11: 4
 * 12: ....
 *
 * Already this is wrong. We're counting ways to get to the higher numbers multiple times
 *
 * If instead we count the number of ways to get between list items, does that do it?
 * Or do we want to count the possible branches we'd make from each list item?
 *
 * Test for example 1
 * possible branches from each list item
 * 1: 1
 * 4: 3
 * 5: 2
 * 6: 1
 * 7: 1
 * 10: 2
 * 11: 1
 * 12: 1
 * 15: 1
 * 16: 1
 * 19: 1
 *
 * That still double counts, because we don't want to count all the branch possibilites for a number if they won't be included in that chain
 *
 * So if we check what possible numbers can be gotten to from each number...
 *
 * 1: [4]
 * 4: [5, 6, 7]    3
 * 5: [6, 7]       2
 * 6: [7]
 * 7: [10]
 * 10: [11, 12]    2
 * 11: [12]
 * 12: [15]
 * 15: [16]
 * 16: [19]
 * 19: [22]
 *
 * So if we add up all the non-1 numbers counts, we get 7
 * That was wrong
 *
 * Looks like instead we want to trace the path of each possible branch, and multiply.
*/

function calculatePossibleJumps() {
  let possibleJumps = {};
  for (let i = 0; i < inputRatings.length; i++) {
    const currentRating = inputRatings[i];

    let inputPossibleJumps = [];
    for (let j = 0; j < possibleInputDifferences.length; j++) {
      const inputDifference = possibleInputDifferences[j];
      if (inputRatings.includes(currentRating + inputDifference)) {
        inputPossibleJumps.push(currentRating + inputDifference)
      }
    }

    possibleJumps[currentRating] = inputPossibleJumps;
  }

  return possibleJumps;
}

/*
const possibleJumps = {
  1: [4], // 1
  4: [5, 6, 7], // 2 1 1 = (2(5) * 1(6) * 1(7))
  5: [6, 7], // 1 1
  6: [7], // 1
  7: [10], // 1
  10: [11, 12], // 1 1
  11: [12], // 1
  12: [15], // 1
  15: [16], // 1
  16: [19], // 1
  19: [22], // 1
}
*/

/*
const possibleJumps = calculatePossibleJumps(lines);

function countBranches(start) {
  const ends = possibleJumps[start];

  if (ends.length === 0) return 1;

  if (ends.length === 1) return countBranches(ends[0]);

  return ends.map(end => countBranches(end)).reduce((m, c) => m + c, 0);
}

console.log(countBranches(1));
*/

// alternative method: go backwards and count possible branches, and record them.
// then as you look forward, you know how many paths you can take to get to the end
/*
22 -> 1
19 -> 1
16 -> 1
..
11 -> 1
10 -> (1 + 1) = 2
7 -> 2
6 -> 2
5 -> (2 + 2) = 4
4 -> (4 + 2 + 2) = 8
1 -> 8
*/

const possibleJumps = calculatePossibleJumps();
// console.log(possibleJumps)

const memoizedBranchCounts = {};
function reverseMemoizeBranches() {
  Object.entries(possibleJumps).reverse().forEach(([start, ends]) => {
    if (ends.length === 0) {
      memoizedBranchCounts[start] = 1;
      return;
    }

    // for each of the ends, return its memoized branch count then sum
    memoizedBranchCounts[start] = ends.reduce((sum, end) => sum + memoizedBranchCounts[end], 0)
  });
}

reverseMemoizeBranches();
// console.log(memoizedBranchCounts)
console.log(memoizedBranchCounts[inputRatings[0]])

// Guess 1: 9023189417984 - too low. Example 2 answer was wrong but guessed anyways /shrug
// Guess 2: 15790581481472 - I wasn't prepending the 0 to the list of inputs. Which meant that I was missing some starting branches.
