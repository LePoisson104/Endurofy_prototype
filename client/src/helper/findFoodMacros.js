export const findFoodMacros = (food, macroName, optional) => {
  return food?.foodNutrients?.find(
    (nutrient) =>
      nutrient.nutrientName.includes(macroName) ||
      nutrient.nutrientName.includes(optional)
  );
};
