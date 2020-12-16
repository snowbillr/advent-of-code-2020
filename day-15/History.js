export class History {
  constructor() {
    this.numbers = {};
    this.rounds = [];
  }

  push(number, round) {
    this.numbers[number] = this.numbers[number] || [];

    this.numbers[number].splice(0, 0, round);
    this.numbers[number] = this.numbers[number].slice(0, 2)

    this.rounds[round] = number;
  }

  numberFor(round) {
    return this.rounds[round];
    /*
    let entries = Object.entries(this.numbers);
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry[1].includes(round)) return entry[0];
    }
    */
  }

  mostRecentRound(number) {
    return this.numbers[number];
  }
}
