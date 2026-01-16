import { realRangeInput, realIngredientIdsInput } from "./inputs";

let freshIngredientCount = 0;

for (const strIngredientId of realIngredientIdsInput) {
  for (const range of realRangeInput) {
    const [strStart, strEnd] = range.split("-");
    const start = Number(strStart);
    const end = Number(strEnd);
    const ingredientId = Number(strIngredientId);

    if (ingredientId >= start && ingredientId <= end) {
      freshIngredientCount++;
      break;
    }
  }
}

console.log(freshIngredientCount);
