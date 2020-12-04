import exampleNumberList from './example-number-list.js';
import actualNumberList from './actual-number-list.js';

function findSum2020(numberList) {
  const targetNumberCount = 2;
  let foundNumbers = [];

  numberList.forEach((firstNumber, firstNumberIndex) => {
    numberList.forEach((secondNumber, secondNumberIndex) => {
      numberList.forEach((thirdNumber, thirdNumberIndex) => {
        if (firstNumberIndex === secondNumberIndex) return;
        if (firstNumberIndex === thirdNumberIndex) return;
        if (secondNumberIndex === thirdNumberIndex) return;

        if (firstNumber + secondNumber + thirdNumber === 2020) {
          foundNumbers = [firstNumber, secondNumber, thirdNumber];
          return;
        }
      })
    })
  })

  console.log(`Found numbers ${foundNumbers}`)
  console.log(`Multiplied value: ${foundNumbers.reduce((answer, number) => answer * number, 1)}`)
}

// findSum2020(exampleNumberList)
findSum2020(actualNumberList)
