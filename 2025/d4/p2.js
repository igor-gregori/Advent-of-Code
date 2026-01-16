import { realInput } from "./input";

const grid = realInput;

function safeGet(v, h) {
  try {
    return grid[v][h];
  } catch (err) {
    return "n";
  }
}

function removeRoll(v, h) {
  let lineClone = "";
  for (let i = 0; i < grid[v].length; i++) {
    if (i === h) {
      lineClone += ".";
    } else {
      lineClone += grid[v][i];
    }
  }
  grid[v] = lineClone;
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

let removedRolls = 0;
let rollsToRemove = [];

while (true) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "@") {
        const r = countFewer(i, j);
        if (r < 4) {
          rollsToRemove.push([i, j]);
        }
      }
    }
  }

  if (rollsToRemove.length === 0) {
    break;
  }

  removedRolls = removedRolls + rollsToRemove.length;

  for (const roll of rollsToRemove) {
    removeRoll(roll[0], roll[1]);
  }

  rollsToRemove = [];
}

console.log(removedRolls);
