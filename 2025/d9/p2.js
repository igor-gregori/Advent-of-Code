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
    areas.push({
      ft: { l: input[i].l, c: input[i].c },
      st: { l: input[j].l, c: input[j].c },
      a: calcArea(input[i].l, input[i].c, input[j].l, input[j].c),
    });
  }
}

areas.sort((a, b) => a.a < b.a);

let inputWithborder = [];
inputWithborder.push(input[input.length - 1]);
let indexToWork = 0;

while (indexToWork !== input.length) {
  const lastElement = inputWithborder.at(-1);
  if (lastElement.c < input[indexToWork].c) {
    inputWithborder.push({ c: lastElement.c + 1, l: lastElement.l });
  } else if (lastElement.c > input[indexToWork].c) {
    inputWithborder.push({ c: lastElement.c - 1, l: lastElement.l });
  } else if (lastElement.l < input[indexToWork].l) {
    inputWithborder.push({ c: lastElement.c, l: lastElement.l + 1 });
  } else if (lastElement.l > input[indexToWork].l) {
    inputWithborder.push({ c: lastElement.c, l: lastElement.l - 1 });
  } else {
    indexToWork++;
  }
}

function isBetween(a, b, x) {
  return x > Math.min(a, b) && x < Math.max(a, b);
}

let validRectangle;
let isValidRectangle;

// Maybe I can do something more optmized here
for (let i = 0; i < areas.length; i++) {
  isValidRectangle = true;
  for (let j = 0; j < inputWithborder.length; j++) {
    if (
      isBetween(areas[i].ft.c, areas[i].st.c, inputWithborder[j].c) &&
      isBetween(areas[i].ft.l, areas[i].st.l, inputWithborder[j].l)
    ) {
      isValidRectangle = false;
      break;
    }
  }
  if (isValidRectangle) {
    validRectangle = areas[i];
    break;
  }
}

console.log("The valid rectangle is:", validRectangle);
console.log("The area of the valid rectangle is:", validRectangle.a);
