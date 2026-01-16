import { realInput } from "./input";

let zeroClicks = 0;
let actualDial = 50;

let rotationDirection;
let rotationNumber;

for (let rotation of realInput) {
  rotationDirection = rotation[0] === "R" ? 1 : -1;
  rotationNumber = Number(rotation.substring(1));

  while (rotationNumber > 0) {
    actualDial = actualDial + rotationDirection;
    actualDial = actualDial % 100;

    if (actualDial === 0) {
      zeroClicks++;
    }
    rotationNumber--;
  }
}

console.log(zeroClicks);

// 412 to low
// 992 correct

// 6107 to low
// 6301 to high
// 5818 not
// 6133 correct
