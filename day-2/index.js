import exampleInput from './example-input.js';
import input from './input.js';

function parseInput(input) {
  return input.split("\n")
              .filter(line => line.length)
}

function parseLine(line) {
  const match = line.match(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)/);
  return {
    firstConstraint: match[1],
    secondConstraint: match[2],
    requiredLetter: match[3],
    password: match[4]
  }
}

function isPasswordValid({ firstConstraint, secondConstraint, requiredLetter, password }) {
  const passwordLetters = password.split('');

  /*
  const requiredLetterCount = passwordLetters.reduce((count, letter) => letter === requiredLetter ? count + 1 : count, 0)
  return firstConstraint <= requiredLetterCount && requiredLetterCount <= secondConstraint;
  */

  const validatesFirstConstraint = passwordLetters[firstConstraint - 1] === requiredLetter;
  const validatesSecondConstraint = passwordLetters[secondConstraint - 1] === requiredLetter;

  return validatesFirstConstraint ? !validatesSecondConstraint : validatesSecondConstraint;
}

function countValidPasswords(passwordList) {
  let validPasswords = 0;

  passwordList.forEach(line => {
    const parsedLine = parseLine(line);
    const passwordValid = isPasswordValid(parsedLine);

    if (passwordValid) {
      validPasswords += 1;
    }
  });

  return validPasswords
}

// const inputLines = parseInput(exampleInput);
const inputLines = parseInput(input);

console.log(countValidPasswords(inputLines));
