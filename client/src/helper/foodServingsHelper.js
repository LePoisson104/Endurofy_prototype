export const foodServingsHelper = ({ serving, unit, foodData }) => {
  if (unit === "g") {
    console.log(serving, unit, foodData);
    foodData.calories = Math.round(foodData.calories / 100) * serving;
    foodData.protein = (foodData.protein / 100).toFixed(1) * serving;
    foodData.carbs = (foodData.carbs / 100).toFixed(1) * serving;
    foodData.fat = (foodData.fat / 100).toFixed(1) * serving;
    console.log(foodData.calories);
    return foodData;
  }
};
