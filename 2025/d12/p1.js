import { realInput } from "./input";

const presentsSize = [];

for (const present of realInput.presents) {
  let count = 0;
  for (const line of present) {
    for (const char of line) {
      if (char === "#") {
        count++;
      }
    }
  }
  presentsSize.push(count);
}

function solveTeq(eq) {
  const [strA, strB] = eq.split("x");
  return Number(strA) * Number(strB);
}

function solvePeq(exp) {
  let sum = 0;
  const np = exp.split(" ");
  for (let i = 0; i < np.length; i++) {
    sum += presentsSize[i] * Number(np[i]);
  }
  return sum;
}

// This is not the best solution...
const PROB = 1.3;

let result = 0;
for (const tree of realInput.trees) {
  const [tEq, pEq] = tree.split(": ");

  const treeSize = solveTeq(tEq);
  const totalPresentSize = solvePeq(pEq);

  if (treeSize > totalPresentSize * PROB) {
    result++;
  }
}
