import { realInput } from "./input";

const grid = realInput;

function safeSet(iRow, iCol, value) {
  let lineClone = "";
  for (let i = 0; i < grid[iRow].length; i++) {
    if (i === iCol) {
      lineClone += value;
    } else {
      lineClone += grid[iRow][i];
    }
  }
  grid[iRow] = lineClone;
}

function safeGet(iRow, iCol) {
  try {
    return grid[iRow][iCol];
  } catch (err) {
    return null;
  }
}

for (let iRow = 0; iRow < grid.length; iRow++) {
  for (let iCol = 0; iCol < grid[0].length; iCol++) {
    if (safeGet(iRow - 1, iCol) === "|") {
      if (grid[iRow][iCol] === ".") {
        safeSet(iRow, iCol, "|");
      }

      if (grid[iRow][iCol] === "^") {
        safeSet(iRow, iCol + 1, "|");
        safeSet(iRow, iCol - 1, "|");
      }
    }
  }
}

let splitterCounter = 0;

for (let iRow = 0; iRow < grid.length; iRow++) {
  for (let iCol = 0; iCol < grid[0].length; iCol++) {
    if (grid[iRow][iCol] === "^" && safeGet(iRow - 1, iCol) === "|") {
      splitterCounter = splitterCounter + 1;
    }
  }
}

console.log(splitterCounter);
