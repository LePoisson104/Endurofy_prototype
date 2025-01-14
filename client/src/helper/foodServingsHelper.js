export const foodServingsHelper = ({ serving, unit, foodData }) => {
  const splitUnit = (foodUnit) => {
    const match = foodUnit?.match(/^(\d+)([a-zA-Z]+)$/);
    return match ? match[1] : foodData?.serving_size; // return the number if match else return the foodData?.serving_size which is just the unit (e.g. "g")
  };

  const servingSize = foodData?.servingSize // usually for custom food
    ? foodData?.servingSize
    : foodData?.serving_unit // usually for edit food may contains string of unit like 100g or g
    ? splitUnit(foodData?.serving_unit)
    : 100; // else it's from FDC which are all in 100g

  if (unit === "g" || unit === "GRM") {
    foodData.calories = (foodData.calories / servingSize) * serving;
    foodData.protein = (foodData.protein / servingSize) * serving;
    foodData.carbs = (foodData.carbs / servingSize) * serving;
    foodData.fat = (foodData.fat / servingSize) * serving;
    return foodData;
  }

  if (unit === "oz") {
    const OZ = 28.3495;
    const gramsInServing = serving * OZ;

    foodData.calories = (foodData.calories / servingSize) * gramsInServing;
    foodData.protein = (foodData.protein / servingSize) * gramsInServing;
    foodData.carbs = (foodData.carbs / servingSize) * gramsInServing;
    foodData.fat = (foodData.fat / servingSize) * gramsInServing;
    return foodData;
  }

  if (unit === "100g") {
    foodData.calories = (foodData.calories / servingSize) * 100 * serving;
    foodData.protein = (foodData.protein / servingSize) * 100 * serving;
    foodData.carbs = (foodData.carbs / servingSize) * 100 * serving;
    foodData.fat = (foodData.fat / servingSize) * 100 * serving;

    return foodData;
  }

  if (unit !== "g") {
    foodData.calories = foodData.calories * serving;
    foodData.protein = foodData.protein * serving;
    foodData.carbs = foodData.carbs * serving;
    foodData.fat = foodData.fat * serving;
    return foodData;
  }
};
