export const foodServingsHelper = ({ serving, unit, foodData }) => {
  if (unit === "g" || unit === "GRM") {
    foodData.calories = (foodData.calories / 100) * serving;
    foodData.protein = (foodData.protein / 100) * serving;
    foodData.carbs = (foodData.carbs / 100) * serving;
    foodData.fat = (foodData.fat / 100) * serving;

    return foodData;
  } else if (unit === "oz") {
    const OZ = 28.3495; // 1 ounce is approximately 28.3495 grams

    // Calculate the number of grams for the given serving size in ounces
    const gramsInServing = serving * OZ;

    // Convert the values based on the serving size and the fact that they are given per 100 grams
    foodData.calories = (foodData.calories / 100) * gramsInServing;
    foodData.protein = (foodData.protein / 100) * gramsInServing;
    foodData.carbs = (foodData.carbs / 100) * gramsInServing;
    foodData.fat = (foodData.fat / 100) * gramsInServing;

    return foodData;
  } else if (unit !== "g") {
    foodData.calories = foodData.calories * serving;
    foodData.protein = foodData.protein * serving;
    foodData.carbs = foodData.carbs * serving;
    foodData.fat = foodData.fat * serving;

    return foodData;
  }
};
