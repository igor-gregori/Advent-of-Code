import { realInput } from "./input";

function parseMachine(line) {
  const indicatorMatch = line.match(/\[([.#]+)\]/);
  const target = indicatorMatch[1].split("").map((c) => (c === "#" ? 1 : 0));
  const buttonMatches = line.matchAll(/\(([0-9,]+)\)/g);
  const buttons = [];
  for (const match of buttonMatches) {
    const indices = match[1].split(",").map(Number);
    buttons.push(indices);
  }

  return { target, buttons };
}

function solveGF2(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const aug = matrix.map((row, i) => [...row, target[i]]);

  let pivot = 0;
  const pivotCols = [];

  for (let col = 0; col < cols && pivot < rows; col++) {
    let pivotRow = -1;
    for (let row = pivot; row < rows; row++) {
      if (aug[row][col] === 1) {
        pivotRow = row;
        break;
      }
    }

    if (pivotRow === -1) continue;

    [aug[pivot], aug[pivotRow]] = [aug[pivotRow], aug[pivot]];
    pivotCols.push(col);

    for (let row = 0; row < rows; row++) {
      if (row !== pivot && aug[row][col] === 1) {
        for (let c = 0; c <= cols; c++) {
          aug[row][c] ^= aug[pivot][c];
        }
      }
    }
    pivot++;
  }

  for (let row = pivot; row < rows; row++) {
    if (aug[row][cols] === 1) {
      return null;
    }
  }

  const freeVars = [];
  for (let col = 0; col < cols; col++) {
    if (!pivotCols.includes(col)) {
      freeVars.push(col);
    }
  }

  let minSolution = null;
  let minPresses = Infinity;

  const numCombinations = 1 << freeVars.length;

  for (let combo = 0; combo < numCombinations; combo++) {
    const solution = new Array(cols).fill(0);

    for (let i = 0; i < freeVars.length; i++) {
      solution[freeVars[i]] = (combo >> i) & 1;
    }

    for (let i = pivotCols.length - 1; i >= 0; i--) {
      const row = i;
      const col = pivotCols[i];

      let sum = aug[row][cols];
      for (let c = col + 1; c < cols; c++) {
        sum ^= aug[row][c] * solution[c];
      }
      solution[col] = sum;
    }

    const presses = solution.reduce((a, b) => a + b, 0);
    if (presses < minPresses) {
      minPresses = presses;
      minSolution = solution;
    }
  }

  return { solution: minSolution, presses: minPresses };
}

function solveMachine(line) {
  const { target, buttons } = parseMachine(line);

  const numLights = target.length;
  const numButtons = buttons.length;

  const matrix = Array(numLights)
    .fill(0)
    .map(() => Array(numButtons).fill(0));

  for (let b = 0; b < numButtons; b++) {
    for (const light of buttons[b]) {
      matrix[light][b] = 1;
    }
  }

  const result = solveGF2(matrix, target);
  return result ? result.presses : Infinity;
}

function solve(input) {
  const lines = input.trim().split("\n");
  let totalPresses = 0;

  for (const line of lines) {
    const presses = solveMachine(line);
    console.log(`Machine requires ${presses} presses`);
    totalPresses += presses;
  }

  return totalPresses;
}

console.log("Total button presses:", solve(realInput));
