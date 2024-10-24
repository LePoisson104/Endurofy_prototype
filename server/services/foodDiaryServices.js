const errorResponse = require("../utils/errorResponse");
const Foods = require("../models/foodDiaryModels");
const { v4: uuidv4 } = require("uuid");

const getAllFood = async (userId) => {
  if (!userId) {
    throw new errorResponse("UserId is required!", 400);
  }

  const getAllFoods = await Foods.queryGetAllFood(userId);

  if (getAllFood.userResponse.length === 0) {
    throw new errorResponse("User Not Found!", 404);
  }

  return getAllFoods;
};

const addFood = async (userId, foodData) => {
  if (!userId && !foodData) {
    throw new errorResponse("UserId and foodData are required!", 400);
  }

  const {
    foodName,
    calories,
    protein,
    carbs,
    fat,
    servingSize,
    servingUnit,
    mealType,
  } = foodData;

  const loggedAt = new Date();
  const foodId = uuidv4();

  const addedFood = await Foods.queryAddFood(
    foodId,
    userId,
    foodName,
    calories,
    protein,
    carbs,
    fat,
    servingSize,
    servingUnit,
    mealType,
    loggedAt
  );

  if (!addFood) {
    throw new errorResponse("Something Went Wrong!", 400);
  }

  return addedFood;
};

const updateFood = async (foodId, updatePayload) => {
  if (!foodId && updatePayload) {
    throw new errorResponse("FoodId and updatePayload are Required!", 400);
  }

  const updatedFood = await Foods.queryUpdateFood(foodId, updatePayload);

  return updatedFood;
};

const deleteFood = async (foodId) => {
  if (!foodId) {
    throw new errorResponse("FoodId is required!", 400);
  }

  const deletedFood = await Foods.queryDeleteFood(foodId);

  return deletedFood;
};

module.exports = {
  getAllFood,
  addFood,
  updateFood,
  deleteFood,
};
