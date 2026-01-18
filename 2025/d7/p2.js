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

let weigths = [];

for (let iRow = grid.length - 1; iRow > 0; iRow--) {
  for (let iCol = 0; iCol < grid[0].length; iCol++) {
    if (grid[iRow][iCol] === "^") {
      let leftWeight = 1;
      let leftSeted = false;

      let rightWeight = 1;
      let rightSeted = false;

      for (let auxRow = iRow; auxRow < grid.length; auxRow++) {
        if (safeGet(auxRow, iCol - 1) === "^" && !leftSeted) {
          for (let i = 0; i < weigths.length; i++) {
            if (weigths[i].iRow === auxRow && weigths[i].iCol === iCol - 1) {
              leftWeight = weigths[i].weigth;
              leftSeted = true;
            }
          }
        }

        if (safeGet(auxRow, iCol + 1) === "^" && !rightSeted) {
          for (let i = 0; i < weigths.length; i++) {
            if (weigths[i].iRow === auxRow && weigths[i].iCol === iCol + 1) {
              rightWeight = weigths[i].weigth;
              rightSeted = true;
            }
          }
        }
      }

      weigths.push({ iRow, iCol, weigth: leftWeight + rightWeight });
    }
  }
}

console.log("weigths length:", weigths.length);
console.log("last weigths:", weigths[weigths.length - 1]);
console.log("final awnser:", weigths[weigths.length - 1].weigth);
