import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

import { Bag } from "./Bag.js";
import { Rule } from './Rule.js';
import { RuleParser } from './RuleParser.js';

const MY_BAG_COLOR = "shiny gold";

// const lines = parseInputStringToLines(exampleInput);
const lines = parseInputStringToLines(actualInput);

const rules = lines.map(line => RuleParser.parseLine(line));

function findAllPossibleParentBagColors(startingColor) {
  let possibleContainingBagColors = [];
  let nextBagColors = [startingColor];
  let applicableRules = [];
  do {
    const nextApplicableRules = rules.filter(rule => {
      return nextBagColors.reduce((containsColor, bagColor) => {
        return containsColor || Object.keys(rule.conditions).includes(bagColor)
      }, false);
    });

    nextBagColors = nextApplicableRules.map(rule => rule.bagColor);
    possibleContainingBagColors = possibleContainingBagColors.concat(nextBagColors);
    applicableRules = applicableRules.concat(nextApplicableRules);


  } while(nextBagColors.length)

  possibleContainingBagColors = possibleContainingBagColors.filter((color, i, a) => a.indexOf(color) == i)
  return possibleContainingBagColors.length;
}

function countRequiredBags(color) {
  const rule = rules.find(r => r.bagColor === color);
  // console.log(rule);

  if (Object.entries(rule.conditions).length === 0) {
    return 1;
  }

  return Object.entries(rule.conditions).map(([conditionColor, conditionCount]) => {
    const countForBagColor = conditionCount * countRequiredBags(conditionColor);
    return countForBagColor
  }).reduce((s, c) => s + c, 0) + 1;
}

// const possibleParentBagColors = findAllPossibleParentBagColors(MY_BAG_COLOR);
// console.log(possibleParentBagColors)

const requiredBagCount = countRequiredBags(MY_BAG_COLOR) - 1; // - 1 for the initial bag being counted twice
console.log(requiredBagCount)

////////////////////////////
// Part 1
// Guess 1: 247 was too high
// Guess 2: 172 - needed to dedupe final array
// Part 2
// Guess 1: 39646 was too high
// Guess 2: 39645 - off by one because I was counting the first bag twice
