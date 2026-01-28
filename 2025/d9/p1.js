import { realInput } from "./input";

const input = realInput;

function calcArea(xi, yi, xj, yj) {
  let base = xi - xj;
  let height = yi - yj;

  if (base < 0) base = base * -1;
  if (height < 0) height = height * -1;

  base = base + 1;
  height = height + 1;

  return base * height;
}

const areas = [];

for (let i = 0; i < input.length; i++) {
  for (let j = i; j < input.length; j++) {
    areas.push(calcArea(input[i].c, input[i].l, input[j].c, input[j].l));
  }
}

let maxArea = 0;

for (const area of areas) {
  if (area > maxArea) {
    maxArea = area;
  }
}

console.log(maxArea);
