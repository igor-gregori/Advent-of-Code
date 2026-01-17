import { realInput } from "./p1Input";

const input = realInput;

const lineLength = input[0].length;
const colLength = input.length;

const operations = [];

for (let i = 0; i < lineLength; i++) {
  const operation = [];
  for (let j = 0; j < colLength; j++) {
    operation.push(input[j][i]);
  }
  operations.push(operation);
}

const operationsResult = [];

for (const operation of operations) {
  const auxOperation = operation;
  const signal = auxOperation.pop();

  operationsResult.push(eval(auxOperation.join(signal)));
}

console.log(operationsResult);

let resultsSum = 0;

for (let i = 0; i < operationsResult.length; i++) {
  resultsSum += operationsResult[i];
}

console.log(resultsSum);
