import { realInput } from "./input.js";

const graph = realInput.reduce((acc, line) => {
  const [node, ...neighbors] = line.split(" ");
  acc[node] = neighbors;
  return acc;
}, {});

let validPaths = 0;

const memo = new Map();

function countPathsMemo(node, hasDac, hasFft) {
  if (node === "out") {
    return hasDac && hasFft ? 1 : 0;
  }

  const key = `${node},${hasDac},${hasFft}`;
  console.log(key);
  if (memo.has(key)) return memo.get(key);

  let count = 0;
  const neighbors = graph[node] || [];

  for (const next of neighbors) {
    count += countPathsMemo(
      next,
      hasDac || next === "dac",
      hasFft || next === "fft",
    );
  }

  memo.set(key, count);
  return count;
}

validPaths = countPathsMemo("svr", false, false);

console.log("Memoization cache size:", memo.size);
console.log("Final valid paths:", validPaths);
