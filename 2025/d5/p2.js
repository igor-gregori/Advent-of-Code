import { realRangeInput } from "./inputs";

const rangeInput = realRangeInput;

for (const [fixedIndex, fixedRange] of rangeInput.entries()) {
  const [strFixedStart, strFixedEnd] = fixedRange.split("-");
  let fixedStart = Number(strFixedStart);
  let fixedEnd = Number(strFixedEnd);

  for (const [auxIndex, auxRange] of rangeInput.entries()) {
    if (fixedIndex === auxIndex) {
      continue;
    }

    if (auxIndex === "X") {
      continue;
    }

    const [strAuxStart, strAuxEnd] = auxRange.split("-");

    const auxStart = Number(strAuxStart);
    const auxEnd = Number(strAuxEnd);

    if (fixedStart >= auxStart && fixedStart <= auxEnd) {
      fixedStart = auxEnd + 1;
    }

    if (fixedEnd >= auxStart && fixedEnd <= auxEnd) {
      fixedEnd = auxStart - 1;
    }
  }

  let newRange = `${fixedStart}-${fixedEnd}`;
  if (fixedRange !== newRange) {
    if (fixedEnd <= fixedStart) {
      newRange = "X";
    }
    rangeInput[fixedIndex] = newRange;
  }
}

console.log(rangeInput);

let freshIdsSum = 0;

for (const finalRange of rangeInput) {
  if (finalRange === "X") {
    continue;
  }

  const [strStart, strEnd] = finalRange.split("-");
  const start = Number(strStart);
  const end = Number(strEnd);

  freshIdsSum = freshIdsSum + (end - start) + 1;
}

console.log(freshIdsSum);
