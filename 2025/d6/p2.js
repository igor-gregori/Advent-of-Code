import { realInput } from "./p2Input";

const input = realInput;

const invertedInput = [];

for (let j = 0; j < input[0].length; j++) {
  const operation = [];
  for (let i = 0; i < input.length; i++) {
    operation.push(input[i][j]);
  }
  invertedInput.push(operation);
}

const operations = [];

for (let i = 0; i < invertedInput.length; i++) {
  let operation = [];
  for (let j = 0; j < invertedInput[i][0].length; j++) {
    let value = "";
    for (let k = 0; k < invertedInput[i].length - 1; k++) {
      value += input[k][i][j];
    }
    operation.push(value);
  }
  const signal = input[input.length - 1][i][0];
  operations.push(operation.join(signal));
}

let sumOfResults = 0;

for (let i = 0; i < operations.length; i++) {
  sumOfResults += eval(operations[i]);
}

console.log(sumOfResults);
