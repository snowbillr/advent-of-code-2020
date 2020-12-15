import { ConvertableNumber } from './ConvertableNumber.js';

export class EngineV1 {
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

export class EngineV2 {
  constructor(instructions) {
    this.mask = '';
    this.instructions = instructions;
    this.memory = {};
  }

  execute() {
    this.instructions.forEach((instruction, lineNumber) => {
      const type = instruction.splice(0, 1)[0];

      switch (type) {
        case 'mask':
          this.mask = instruction[0];
          break;
        case 'set':
          const location = ConvertableNumber.fromDecimal(instruction[0]);
          const value = instruction[1];

          const maskedLocation = this.applyMask(location.binaryString);
          const maskedBitCount = maskedLocation.split('').filter(v => v === 'X').length;
          const maskedBitIndices = maskedLocation.split('').reduce((indices, b, i) => {
            if (b === 'X') indices.push(i);
            return indices;
          }, []);
          binaryCount(maskedBitCount).forEach(bits => {
            let floatingLocation = maskedLocation.split('');
            bits.split('').forEach((bit, i) => {
              floatingLocation.splice(maskedBitIndices[i], 1, bit);
            });
            floatingLocation = floatingLocation.join('');
            const floatingLocationDecimal = ConvertableNumber.fromBinaryString(floatingLocation).decimal;
            this.memory[floatingLocationDecimal] = value;
          });

          break;
      }
    });
  }

  applyMask(binaryString) {
    return binaryString.split('').map((b, i) => {
      switch (this.mask[i]) {
        case 'X': return 'X';
        case '1': return 1;
        case '0': return b;
      }
    }).join('');
  }

  calculateSumOfValues() {
    /*
    let sum = 0;
    for (let i = this.memory.length; i--;) {
      sum += this.memory[i] || 0;
    }
    return sum;
    console.log(this.memory.length)
    let sum = 0;
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i]) {
        sum += this.memory[i];
      }
    }
    return sum;
    */
    return Object.values(this.memory).reduce((sum, value) => {
      return sum + value;
    }, 0);
    /**/
  }
}

function binaryCount(digits) {
  return Array.from({ length: 2 ** digits }, (v, i) => ConvertableNumber.fromDecimal(i))
    .map(cn => cn.binaryString)
    .map(bs => bs.split('').slice(bs.length - digits).join(''))
}

// Part 2
// Guess 1: 25967277944 -- too low
