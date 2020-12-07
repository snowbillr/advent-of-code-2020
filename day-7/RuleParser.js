import { Rule } from './Rule.js';

const conditionRegex = /(\d+)\s(.+)\sbag/;

// const testLine = "light red bags contain 1 bright white bag, 2 muted yellow bags.";
// const testLine2 = "faded blue bags contain no other bags.";

export const RuleParser = {
  parseLine(line) {
    const [bagColor, rawConditions] = line.split(" bags contain ");

    let conditions = [];
    if (rawConditions.match(/no other bags/) == null) {
      conditions = rawConditions.split(", ").map(c => c.match(conditionRegex).slice(1))
    }

    const conditionColorCountMap = conditions.reduce((map, condition) => {
      const [count, color] = condition;
      map[color] = parseInt(count);
      return map;
    }, {});

    return new Rule(bagColor, conditionColorCountMap);
  }
}

// console.log(RuleParser.parseLine(testLine));
// console.log(RuleParser.parseLine(testLine2));
