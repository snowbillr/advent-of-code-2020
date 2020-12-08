import { parseInputStringToLines } from '../input-utils.js';

import exampleLoopingInput from './example-looping-input.js';
import exampleTerminatingInput from './example-terminating-input.js';
import actualInput from './actual-input.js';

import { Instruction } from './Instruction.js';
import { Engine } from './Engine.js';

// const lines = parseInputStringToLines(exampleLoopingInput);
// const lines = parseInputStringToLines(exampleTerminatingInput);
const lines = parseInputStringToLines(actualInput);

function parseInstructions(lines) {
  return lines.map(l => Instruction.fromLine(l));
}

const instructions = parseInstructions(lines);
const engine = new Engine(instructions);

instructions.forEach((instruction, lineNumber) => {
  if (instruction.operator === "acc") return;

  if (instruction.operator === "nop") {
    engine.overrideOperator(lineNumber, "jmp");
  } else if (instruction.operator === "jmp") {
    engine.overrideOperator(lineNumber, "nop");
  }

  engine.executeUntilLoopOrFinish();
  if (!engine.loopDetected) {
    console.log('program finished');
    console.log(engine.accumulator);
    throw "Finished!"
  } else {
    engine.reset();
  }
});

// engine.executeUntilLoopOrFinish();
// console.log(engine.loopDetected);
// console.log(engine.accumulator);
