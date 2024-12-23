const errorResponse = require("../utils/errorResponse");
const Foods = require("../models/foodDiaryModels");
const { v4: uuidv4 } = require("uuid");

const getAllFood = async (userId, date) => {
  if (!userId && !date) {
    throw new errorResponse("UserId and date are required!", 400);
  }

  const getAllFoods = await Foods.queryGetAllFood(userId, date);

  if (!getAllFoods) {
    throw new errorResponse(
      "Something went wrong while trying to get all food logs!",
      500
    );
  }

  return getAllFoods;
};

const getLogDates = async (userId, startDate, endDate) => {
  if (!userId && !startDate && !endDate) {
    throw new errorResponse(
      "userId, startDate, and endDate are required!",
      400
    );
  }

  const logDates = await Foods.queryGetLogDates(userId, startDate, endDate);

  if (!logDates) {
    throw new errorResponse(
      "Something went wrong while trying to get log dates!",
      500
    );
  }

  return logDates;
};

const addFood = async (userId, foodPayload) => {
  if (!userId && Object.keys(foodPayload).length === 0) {
    throw new errorResponse("UserId and foodPayload are required!", 400);
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
    loggedAt,
  } = foodPayload;

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
    throw new errorResponse(
      "Something went wrong while trying to add food!",
      400
    );
  }

  return addedFood;
};

const updateFood = async (foodId, updatePayload) => {
  if (!foodId && !updatePayload) {
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

  if (!deletedFood) {
    throw new errorResponse(
      "Something went wrong while trying to delete food!",
      500
    );
  }

  return deletedFood;
};

module.exports = {
  getAllFood,
  getLogDates,
  addFood,
  updateFood,
  deleteFood,
};
