import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

class SeatLocation {
  static fromBoardingPass(boardingPass) {
    const [_, rawRows, rawSeats] = boardingPass.match(/([FB]+)([LR]+)/)
    const rowSteps = convertBoardingPassRowsToSteps(rawRows);
    const seatSteps = convertBoardingPassSeatsToSteps(rawSeats);

    const row = binaryTraverse(0, 127, rowSteps);
    const seat = binaryTraverse(0, 7, seatSteps);

    return new SeatLocation(row, seat);
  }

  constructor(row, seat) {
    this.row = row;
    this.seat = seat;

    this.seatID = row * 8 + seat;
  }
}

/*
 * `max` is the maximum value of the range
 * `steps` is an array of characters indicating which direction in the range to look at next.
 *    `L` is for the lower half
 *    `U` is for the upper half
 */
function binaryTraverse(min, max, steps) {
  const upperMiddle = max - Math.floor((max - min) / 2);
  const lowerMiddle = min + Math.floor((max - min) / 2);
  const step = steps[0];

  if (steps.length === 1) {
    if (step === 'L') {
      return min;
    } else {
      return max;
    }
  }

  if (step === 'L') {
    return binaryTraverse(min, lowerMiddle, steps.slice(1))
  } else { // steps[0] === 'R'
    return binaryTraverse(upperMiddle, max, steps.slice(1))
  }
}

function convertBoardingPassRowsToSteps(rawRows) {
  return rawRows.split('').map(r => r === 'F' ? 'L' : 'U');
}

function convertBoardingPassSeatsToSteps(rawSeats) {
  return rawSeats.split('').map(r => r === 'L' ? 'L' : 'U');
}

// const lines = parseInputStringToLines(exampleInput);
const lines = parseInputStringToLines(actualInput);
const seatLocations = lines.map(line => SeatLocation.fromBoardingPass(line));
const seatIds = seatLocations.map(sl => sl.seatID).sort((a, b) => a - b);

for (let i = 1; i < seatIds.length; i++) {
  const previousSeatId = seatIds[i-1];
  const currentSeatId = seatIds[i];

  if (currentSeatId - previousSeatId > 1) {
    console.log(previousSeatId, currentSeatId)
  }
}
