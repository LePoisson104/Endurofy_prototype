export const foodServingsHelper = ({ serving, unit, foodData }) => {
  if (unit === "g" || unit === "GRM") {
    const servingSize = foodData?.servingSize ? foodData?.servingSize : 100;

    foodData.calories = (foodData.calories / servingSize) * serving;
    foodData.protein = (foodData.protein / servingSize) * serving;
    foodData.carbs = (foodData.carbs / servingSize) * serving;
    foodData.fat = (foodData.fat / servingSize) * serving;

    return foodData;
  } else if (unit === "oz") {
    const OZ = 28.3495; // 1 ounce is approximately 28.3495 grams

    // Calculate the number of grams for the given serving size in ounces
    const gramsInServing = serving * OZ;
    const servingSize = foodData?.servingSize ? foodData?.servingSize : 100;

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
