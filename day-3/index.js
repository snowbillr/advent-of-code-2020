import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

const DEBUG = false;

class MapPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Map {
  static parseLines(lines) {
    const rows = lines.map(l => MapRow.parseLine(l));
    return new Map(rows);
  }

  constructor(rows) {
    this.rows = rows;
    this.width = rows[0].getWidth();
    this.height = rows.length;
    this.cursor = new MapPoint(0, 0);
  }

  traverse(x, y) {
    this.cursor.x = (this.cursor.x + x) % this.width;
    this.cursor.y = this.cursor.y + y;

    DEBUG && console.log(`cursor moved to (${this.cursor.toString()})`)
  }

  resetCursor() {
    this.cursor.x = 0;
    this.cursor.y = 0;
  }

  isOpenAtCursor() {
    return this.rows[this.cursor.y].at(this.cursor.x).isOpen;
  }

  toString() {
    return this.rows.map(r => r.toString()).join('\n');
  }
}

class MapRow {
  static parseLine(line) {
    const cells = line.split('').map(c => MapCell.parseCharacter(c));
    return new MapRow(cells);
  }

  constructor(cells) {
    this.cells = cells;
  }

  toString() {
    return this.cells.map(c => c.toString()).join('');
  }

  getWidth() {
    return this.cells.length;
  }

  at(index) {
    return this.cells[index];
  }
}

class MapCell {
  static parseCharacter(character) {
    return new MapCell(character === ".");
  }

  constructor(isOpen) {
    this.isOpen = isOpen;
  }

  toString() {
    return this.isOpen ? '.' : '#';
  }
}

// const inputLines = parseInputStringToLines(exampleInput);
const inputLines = parseInputStringToLines(actualInput);
const map = Map.parseLines(inputLines);


function findTreesForTraverse(x, y) {
  let foundTreeCount = 0;

  do {
    map.traverse(x, y);
    foundTreeCount += map.isOpenAtCursor() ? 0 : 1;
  } while(map.cursor.y < map.height - 1)

  map.resetCursor();

  return foundTreeCount;
}

const traverseSlopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];
const foundTreesForTraverses = traverseSlopes.map(slope => findTreesForTraverse(...slope))

console.log(foundTreesForTraverses);

console.log(`multiplied value: ${foundTreesForTraverses.reduce((v, t) => v * t, 1)}`);
