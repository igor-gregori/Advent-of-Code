import { realInput } from "./input";

let invalidIds = [];

for (const range of realInput) {
  const start = Number(range.split("-")[0]);
  const end = Number(range.split("-")[1]);

  for (let i = start; i <= end; i++) {
    const si = i.toString();
    if (si.length % 2 === 0) {
      if (
        si.substring(0, si.length / 2) ===
        si.substring(si.length / 2, si.length)
      ) {
        invalidIds.push(i);
      }
    }
  }
}

// console.log(invalidIds);

let invalidIdsSum = 0;
for (let i = 0; i < invalidIds.length; i++) {
  invalidIdsSum += invalidIds[i];
}

console.log(invalidIdsSum);
