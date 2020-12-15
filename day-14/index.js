import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

import { Engine } from './Engine.js';

const lines = parseInputStringToLines(exampleInput)
// const lines = parseInputStringToLines(actualInput)

const DEBUG = false;

function parseLines(lines) {
  const maskLine = lines.splice(0, 1)[0];
  const [mask] = maskLine.match(/[X01]+/)

  const instructions = lines.map(line => {
    const [_, location, value] = line.match(/mem\[(\d+)\]\s=\s(\d+)/)
    return [location, value].map(v => parseInt(v));
  });

  return {
    mask,
    instructions
  }
}


const { mask, instructions } = parseLines(lines);

const engine = new Engine(mask, instructions);
engine.execute();
console.log(engine.calculateSumOfValues())
