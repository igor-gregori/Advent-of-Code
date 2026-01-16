import { realInput } from "./input";

const joltages = [];

for (const bank of realInput) {
  let joltage = "";
  let lastI = null;
  for (let j = 12; j > 0; j--) {
    let c = "";
    for (let i = lastI === null ? 0 : lastI + 1; i <= bank.length - j; i++) {
      if (bank[i] > c) {
        c = bank[i];
        lastI = i;
      }
    }
    joltage += c;
  }
  joltages.push(joltage);
}

// console.log(joltages);

let joltagesSum = 0;

for (let k = 0; k < joltages.length; k++) {
  joltagesSum += Number(joltages[k]);
}

console.log(joltagesSum);
