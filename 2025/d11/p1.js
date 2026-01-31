import { realInput } from "./input";

const input = realInput.reduce((acc, line) => {
  const [node, ...neighbors] = line.split(" ");
  acc[node] = neighbors;
  return acc;
}, {});

const validPaths = [];
const invalidPaths = [];

function walkThePath(path, neighbors) {
  for (let next of neighbors) {
    if (next === "out") {
      validPaths.push(path + "out");
    } else if (next === "you") {
      invalidPaths.push(path + "you");
    } else {
      walkThePath(path + next, input[next]);
    }
  }
}

walkThePath("you", input["you"]);

console.log("Number of valid paths:", validPaths.length);
console.log("Number of invalid paths:", invalidPaths.length);
