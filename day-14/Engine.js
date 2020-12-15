import { ConvertableNumber } from './ConvertableNumber.js';

export class Engine {
  constructor(mask, instructions) {
    this.mask = mask;
    this.instructions = instructions;
    this.memory = [];
  }

  execute() {
    this.instructions.forEach(instruction => {
      const location = instruction[0];
      const value = ConvertableNumber.fromDecimal(instruction[1]);

      this.memory[location] = this.applyMask(value.binaryString);
    });
  }

  applyMask(binaryString) {
    return binaryString.split('').map((b, i) => {
      switch (this.mask[i]) {
        case 'X': return b;
        case '1': return 1;
        case '0': return 0;
      }
    }).join('');
  }

  calculateSumOfValues() {
    return this.memory.filter(Boolean).reduce((sum, binaryString) => {
      return sum + ConvertableNumber.fromBinaryString(binaryString).decimal;
    }, 0);
  }
}
