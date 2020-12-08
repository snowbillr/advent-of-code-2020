export class Instruction {
  static fromLine(line) {
    const [_, operator, argument] = line.match(/(.+)\s([-+]\d+)/);

    return new Instruction(operator, parseInt(argument));
  }

  constructor(operator, argument) {
    this.operator = operator;
    this.argument = argument;
  }
}
