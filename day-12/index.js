import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';
import { Ship } from './Ship.js';

// const lines = parseInputStringToLines(exampleInput)
const lines = parseInputStringToLines(actualInput)

function parseInputToInstructions(lines) {
  return lines.map(line => {
    const [_, action, value] = line.match(/([NSEWFLR])(\d+)/)

    return {
      action: action,
      value: parseInt(value)
    };
  });
}

const instructions = parseInputToInstructions(lines);
const ship = new Ship();
instructions.forEach(instruction => ship.executeInstruction(instruction));
console.log(ship.calculateManhattanDistance())
