import { realInput } from "./input";

const grid = realInput;

function safeGet(v, h) {
  try {
    return grid[v][h];
  } catch (err) {
    return "n";
  }
}

function countFewer(i, j) {
  let counter = 0;

  if (safeGet(i - 1, j - 1) === "@") counter++;
  if (safeGet(i - 1, j + 0) === "@") counter++;
  if (safeGet(i - 1, j + 1) === "@") counter++;

  if (safeGet(i + 0, j - 1) === "@") counter++;
  if (safeGet(i + 0, j + 1) === "@") counter++;

  if (safeGet(i + 1, j - 1) === "@") counter++;
  if (safeGet(i + 1, j + 0) === "@") counter++;
  if (safeGet(i + 1, j + 1) === "@") counter++;

  return counter;
}

let accessedRolls = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "@") {
      const r = countFewer(i, j);
      if (r < 4) {
        accessedRolls++;
      }
    }
  }
}

console.log(accessedRolls);
