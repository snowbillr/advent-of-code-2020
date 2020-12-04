import exampleInput from './example-input.js';
import actualInput from './actual-input.js';
import testInvalidInput from './test-invalid-input.js';
import testValidInput from './test-valid-input.js';

import { parseInputStringToLines } from '../input-utils.js';

const DEBUG = false;

// const inputLines = parseInputStringToLines(exampleInput);
const inputLines = parseInputStringToLines(actualInput);
// const inputLines = parseInputStringToLines(testValidInput);

class PassportField {
  constructor(name, value, validationRule) {
    this.name = name;
    this.value = value;
    this.validationRule = validationRule;
  }

  isValid() {
    const valid = this.validationRule.isValid(this.value);

    DEBUG && console.log(this.name, this.value, valid);
    return valid;
  }
}

class InclusiveDateRangeValidationRule {
  constructor(minimumDate, maximumDate) {
    this.minimumDate = minimumDate;
    this.maximumDate = maximumDate;
  }

  isValid(value) {
    if (value == null) return false;

    return value.match(/^\d{4}$/)
      && parseInt(value) >= this.minimumDate
      && parseInt(value) <= this.maximumDate
  }
}

class HeightValidationRule {
  isValid(value) {
    if (value == null) return false;

    const match = value.match(/(\d+)(cm|in)/);

    if (match == null) return false;

    const number = parseInt(match[1]);
    switch(match[2]) {
      case 'cm':
        return 150 <= number && number <= 193
      case 'in':
        return 59 <= number && number <= 76
      default:
        return false;
    }
  }
}

class HexColorValidationRule {
  isValid(value) {
    if (value == null) return false;

    return !!value.match(/#[0-9a-f]{6}/)
  }
}

class ExactMatchValidationRule {
  constructor(validValues) {
    this.validValues = validValues;
  }

  isValid(value) {
    if (value == null) return false;

    return this.validValues.includes(value);
  }
}

class DigitCountValidationRule {
  constructor(digitCount) {
    this.digitCount = digitCount;
  }

  isValid(value) {
    if (value == null) return false;

    try {
      parseInt(value);
      return value.length === this.digitCount;
    } catch {
      return false;
    }
  }
}

class IgnoredValidationRule {
  isValid() {
    return true;
  }
}

class Passport {
  static fromLine(line) {
    const passportData = line.split(' ').reduce((hash, tuple) => {
      const [key, value] = tuple.split(':');
      hash[key] = value;

      return hash;
    }, {});

    return new Passport(passportData);
  }

  constructor(passportData) {
    this.fields = [
      new PassportField('byr', passportData.byr, new InclusiveDateRangeValidationRule(1920, 2002)),
      new PassportField('iyr', passportData.iyr, new InclusiveDateRangeValidationRule(2010, 2020)),
      new PassportField('eyr', passportData.eyr, new InclusiveDateRangeValidationRule(2020, 2030)),
      new PassportField('hgt', passportData.hgt, new HeightValidationRule()),
      new PassportField('hcl', passportData.hcl, new HexColorValidationRule()),
      new PassportField('ecl', passportData.ecl, new ExactMatchValidationRule(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])),
      new PassportField('pid', passportData.pid, new DigitCountValidationRule(9)),
      new PassportField('cid', passportData.cid, new IgnoredValidationRule()),
    ];
  }

  isValid() {
    return this.fields.reduce((valid, field) => valid && field.isValid(), true);
  }
}

function parseInputToPassportLines(inputLines) {
  const passportLines = [];

  let currentPassportLine = [];
  inputLines.forEach((inputLine, i) => {
    if (inputLine.length === 0) {
      passportLines.push(currentPassportLine.join(' '));
      currentPassportLine = [];
    } else {
      currentPassportLine.push(inputLine);
    }
  });
  passportLines.push(currentPassportLine.join(' '));

  return passportLines;
}

const passportLines = parseInputToPassportLines(inputLines);
const passports = passportLines.map(passportLine => Passport.fromLine(passportLine));

const validPassportCount = passports.filter(passport => passport.isValid()).length;
console.log(validPassportCount);
