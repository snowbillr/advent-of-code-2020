import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

// const lines = parseInputStringToLines(exampleInput)
const lines = parseInputStringToLines(actualInput)

const FLOOR = '.';
const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';

// row, col
const directions = {
  nw: [-1, -1],
  n: [-1, 0],
  ne: [-1, 1],
  w: [0, -1],
  e: [0, 1],
  sw: [1, -1],
  s: [1, 0],
  se: [1, 1]
};

// grid[row][col]
function buildGrid(lines) {
  return lines.map(line => {
    return line.split('');
  });
}

function countAdjacentOccupiedSeats(grid, row, col) {
  return Object.values(directions).reduce((sum, direction) => {
    const cell = cellAt(grid, ...[direction[0] + row, direction[1] + col]);

    return sum + (cell === OCCUPIED_SEAT ? 1 : 0);
  }, 0);
}

function countFirstDirectionalOccupiedSeats(grid, row, col) {
  return Object.values(directions).reduce((sum, direction) => {
    const directionValue = traverseUntilValue(grid, row, col, direction)

    return sum + (directionValue === OCCUPIED_SEAT ? 1 : 0);
  }, 0);
}

function traverseUntilValue(grid, row, col, direction) {
  let nextRow = row + direction[0];
  let nextCol = col + direction[1];
  let cell = cellAt(grid, nextRow, nextCol);

  if (cell === null) return null;
  if (cell === OCCUPIED_SEAT) return OCCUPIED_SEAT;
  if (cell === EMPTY_SEAT) return EMPTY_SEAT;
  return traverseUntilValue(grid, nextRow, nextCol, direction);
}

function cellAt(grid, row, col) {
  if (row < 0 || row >= grid.length) return null;
  if (col < 0 || col >= grid[0].length) return null;

  return grid[row][col];
}

function iterate(grid) {
  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      const cell = cellAt(grid, rowIndex, colIndex);
      const firstDirectionalOccupiedSeatCount = countFirstDirectionalOccupiedSeats(grid, rowIndex, colIndex);

      if (cell === FLOOR) return cell;
      if (cell === EMPTY_SEAT && firstDirectionalOccupiedSeatCount === 0) return OCCUPIED_SEAT;
      if (cell === OCCUPIED_SEAT && firstDirectionalOccupiedSeatCount >= 5) return EMPTY_SEAT;
      return cell;
    });
  });
}

function areGridsIdentical(grid1, grid2) {
  let identical = true;
  for (let r = 0; r < grid1.length; r++) {
    identical = identical && grid1[r].join('') === grid2[r].join('');
  }

  return identical;
}

function iterateUntilStable(grid) {
  let previousGrid = grid;
  let nextGrid = iterate(grid);

  while (!areGridsIdentical(previousGrid, nextGrid)) {
    previousGrid = nextGrid;
    nextGrid = iterate(nextGrid);
  }

  return nextGrid;
}

function countOccupiedSeats(grid) {
  return grid.reduce((gridSum, row) => {
    return gridSum + row.reduce((rowSum, cell) => cell === OCCUPIED_SEAT ? rowSum + 1 : rowSum, 0);
  }, 0);
}

function printGrid(grid) {
  grid.forEach(row => {
    console.log(row.join(''))
  })
}

const initialGrid = buildGrid(lines);
const stableGrid = iterateUntilStable(initialGrid);
console.log(countOccupiedSeats(stableGrid))
