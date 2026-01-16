import { realInput } from "./input";

let zeroClick = 0;
let actualDial = 50;

let rotationDirection;
let rotationNumber;

function calcDialScale(value) {
  if (value < 0) {
    return calcDialScale(value + 100);
  } else if (value > 100) {
    return calcDialScale(value - 100);
  } else if (value === 100) {
    return 0;
  }
  return value;
}

for (let rotation of realInput) {
  rotationDirection = rotation[0] === "R" ? 1 : -1;
  rotationNumber = Number(rotation.substring(1));

  actualDial = actualDial + rotationNumber * rotationDirection;

  if (actualDial < 0 || actualDial >= 100) {
    actualDial = calcDialScale(actualDial);
  }

  if (actualDial === 0) {
    zeroClick++;
  }

  console.log(actualDial);
}

console.log("----");
console.log(zeroClick);

// 412 to low
// 992 correct
