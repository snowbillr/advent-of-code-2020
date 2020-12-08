import { Instruction } from './Instruction.js';

export class Engine {
  constructor(instructions) {
    this.instructions = instructions;
    this.accumulator = 0;
    this.pointer = 0;

    this.instructionOverrides = {};

    this.loopDetected = true;
  }

  overrideOperator(lineNumber, newOperator) {
    this.instructionOverrides[lineNumber] = new Instruction(newOperator, this.instructions[lineNumber].argument);
  }

  reset() {
    this.instructionOverrides = {};
    this.accumulator = 0;
    this.loopDetected = true;
    this.pointer = 0;
  }

  executeUntilLoopOrFinish() {
    // { line number: count }
    const executionTracker = {};

    // while no line has been executed more than once
    while(Object.values(executionTracker).filter(v => v > 1).length === 0) {
      const currentInstruction = this.instructionOverrides[this.pointer] ?? this.instructions[this.pointer];
      executionTracker[this.pointer] = executionTracker[this.pointer] || 0;
      executionTracker[this.pointer] += 1;

      if (Object.values(executionTracker).filter(v => v > 1).length > 0) return;

      switch(currentInstruction.operator) {
        case "nop":
          this.pointer += 1;
          break;
        case "acc":
          this.accumulator += currentInstruction.argument;
          this.pointer += 1;
          break;
        case "jmp":
          this.pointer += currentInstruction.argument;
          break;
        default:
          throw `Unrecognized instruction ${currentInstruction.operator}`
      }

      if (this.pointer === this.instructions.length) {
        break;
      }
    }

    this.loopDetected = false;
  }

  executeInstruction(instruction) {

  }
}
