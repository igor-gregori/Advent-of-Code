import { realInput } from "./input";

const joltages = [];

for (const bank of realInput) {
  let gf = "0";
  let gfi;
  for (let i = 0; i < bank.length - 1; i++) {
    if (bank[i] > gf) {
      gf = bank[i];
      gfi = i;
    }
  }

  let gs = "0";
  for (let j = gfi + 1; j < bank.length; j++) {
    if (bank[j] > gs) {
      gs = bank[j];
    }
  }

  joltages.push(gf + gs);
}

console.log(joltages);

let joltagesSum = 0;

for (let k = 0; k < joltages.length; k++) {
  joltagesSum += Number(joltages[k]);
}

console.log(joltagesSum);
