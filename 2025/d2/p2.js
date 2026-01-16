import { realInput } from "./input";

let invalidIds = [];

for (const range of realInput) {
  const start = Number(range.split("-")[0]);
  const end = Number(range.split("-")[1]);

  for (let i = start; i <= end; i++) {
    const si = i.toString();
    for (let j = 1; j <= si.length; j++) {
      const subSi = si.substring(0, j);

      if (subSi.length > si.length / 2) {
        break;
      }

      if (si.length % subSi.length !== 0) {
        continue;
      }

      let isInvalidId = true;
      for (let k = subSi.length; k < si.length; k = k + subSi.length) {
        if (subSi !== si.substring(k, k + subSi.length)) {
          isInvalidId = false;
          break;
        }
      }

      if (isInvalidId) {
        invalidIds.push(si);
        break;
      }
    }
  }
}

console.log(invalidIds);

let invalidIdsSum = 0;
for (let i = 0; i < invalidIds.length; i++) {
  invalidIdsSum += Number(invalidIds[i]);
}

console.log(invalidIdsSum);
