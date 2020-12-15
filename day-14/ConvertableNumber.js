const BINARY_LENGTH = 36;
const BINARY_VALUES = Array.from({ length: BINARY_LENGTH }, (v, i) => 2 ** i).reverse();

function decimalToBinaryString(decimal) {
  let decliningTotal = decimal;
  return BINARY_VALUES.map(v => {
    if (v <= decliningTotal) {
      decliningTotal -= v;
      return 1;
    } else {
      return 0;
    }
  }).join('');
}

function binaryStringToDecimal(binaryString) {
  return BINARY_VALUES.reduce((sum, v, i) => {
    if (binaryString[i] === '1') return sum + v;
    else return sum;
  }, 0);
}

export class ConvertableNumber {
  static fromBinaryString(binaryString) {
    return new ConvertableNumber(binaryString, binaryStringToDecimal(binaryString));
  }

  static fromDecimal(decimal) {
    return new ConvertableNumber(decimalToBinaryString(decimal), decimal);
  }

  constructor(binaryString, decimal) {
    this.binaryString = binaryString;
    this.decimal = decimal;
  }
}
