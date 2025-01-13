export const foodServingsHelper = ({ serving, unit, foodData }) => {
  const splitUnit = (foodUnit) => {
    const match = foodUnit?.match(/^(\d+)([a-zA-Z]+)$/); // Match number followed by letters
    if (match) {
      return match[1]; // Return split parts: number and foodUnit
    }
    return foodData?.serving_size; // Default if no number is found
  };

  const servingSize = foodData?.servingSize
    ? foodData?.servingSize
    : foodData?.serving_unit
    ? splitUnit(foodData?.serving_unit)
    : 100;

  if (unit === "g" || unit === "GRM") {
    foodData.calories = (foodData.calories / servingSize) * serving;
    foodData.protein = (foodData.protein / servingSize) * serving;
    foodData.carbs = (foodData.carbs / servingSize) * serving;
    foodData.fat = (foodData.fat / servingSize) * serving;

    return foodData;
  } else if (unit === "oz") {
    const OZ = 28.3495; // 1 ounce is approximately 28.3495 grams

    // Calculate the number of grams for the given serving size in ounces
    const gramsInServing = serving * OZ;

    // Convert the values based on the serving size and the fact that they are given per 100 grams
    foodData.calories = (foodData.calories / servingSize) * gramsInServing;
    foodData.protein = (foodData.protein / servingSize) * gramsInServing;
    foodData.carbs = (foodData.carbs / servingSize) * gramsInServing;
    foodData.fat = (foodData.fat / servingSize) * gramsInServing;

    return foodData;
  } else if (unit !== "g") {
    foodData.calories = foodData.calories * serving;
    foodData.protein = foodData.protein * serving;
    foodData.carbs = foodData.carbs * serving;
    foodData.fat = foodData.fat * serving;

    return foodData;
  }
};
