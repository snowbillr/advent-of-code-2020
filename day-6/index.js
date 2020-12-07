import { parseInputStringToLines } from '../input-utils.js';

import exampleInput from './example-input.js';
import actualInput from './actual-input.js';

function parseLinesToGroupCommonYesAnswers(lines) {
  const groups = [];

  let currentGroup = [];
  lines.forEach(line => {
    if (line.length === 0) {
      groups.push(currentGroup);
      currentGroup = [];
    } else {
      currentGroup.push(line);
    }
  });
  groups.push(currentGroup);

  return groups;
}

function countCommonAnswers(groupAnswers) {
  const answers = {};
  groupAnswers.forEach(personAnswers => {
    personAnswers.split('').forEach(personAnswer => {
      answers[personAnswer] = answers[personAnswer] || 0;
      answers[personAnswer] += 1;
    });
  });

  return Object.entries(answers).reduce((total, [answer, count]) => {
    return count == groupAnswers.length ? 1 + total : total;
  }, 0);
}

// const lines = parseInputStringToLines(exampleInput);
const lines = parseInputStringToLines(actualInput);
const groupCommonYesAnswers = parseLinesToGroupCommonYesAnswers(lines);

const groupCommonAnswerCounts = groupCommonYesAnswers.map(groupAnswers => {
  return countCommonAnswers(groupAnswers)
});

const groupCommonAnswerSum = groupCommonAnswerCounts.reduce((sum, c) => sum + c, 0);
console.log(groupCommonAnswerSum)


