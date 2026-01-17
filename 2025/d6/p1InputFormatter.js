import { realInput } from "./p1Input";

const formattedInput = [];

for (const line of realInput) {
  const formattedLine = [];
  const auxLine = line.split(" ");
  for (const auxElement of auxLine) {
    if (auxElement !== "") {
      formattedLine.push(auxElement);
    }
  }
  formattedInput.push(formattedLine);
}

console.dir(JSON.stringify(formattedInput));
