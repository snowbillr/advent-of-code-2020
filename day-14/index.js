import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

import { EngineV1, EngineV2 } from './Engine.js';

// const lines = parseInputStringToLines(exampleInput)
const lines = parseInputStringToLines(actualInput)

const DEBUG = false;

function parseInstructions(lines) {
  return lines.map(line => {
    if (line.match(/mem/)) {
      const [_, location, value] = line.match(/mem\[(\d+)\]\s=\s(\d+)/)
      return ['set', parseInt(location), parseInt(value)];
    } else {
      const [mask] = line.match(/[X01]+/)
      return ['mask', mask];
    }

  });
}

const instructions = parseInstructions(lines);
// const engine = new EngineV1(instructions);
// engine.execute();
// console.log(engine.calculateSumOfValues())

const engine = new EngineV2(instructions);
engine.execute();
// console.log(engine.memory)
console.log(engine.calculateSumOfValues())
