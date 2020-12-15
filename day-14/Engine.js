import { ConvertableNumber } from './ConvertableNumber.js';

export class Engine {
  constructor(instructions) {
    this.mask = '';
    this.instructions = instructions;
    this.memory = [];
  }

  execute() {
    this.instructions.forEach(instruction => {
      const type = instruction.splice(0, 1)[0];

      switch (type) {
        case 'mask':
          this.mask = instruction[0];
          break;
        case 'set':
          const location = instruction[0];
          const value = ConvertableNumber.fromDecimal(instruction[1]);
          this.memory[location] = this.applyMask(value.binaryString);
          break;
      }
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
