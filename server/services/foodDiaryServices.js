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

const getFavoriteFood = async (userId) => {
  if (!userId) {
    throw new errorResponse("UserId is required!", 400);
  }

  const getFavorites = await Foods.queryGetFavoriteFood(userId);

  if (!getFavorites) {
    throw new errorResponse(
      "Something went wrong while trying to get favorite food!",
      500
    );
  }

  return getFavorites;
};

const getIsFavoriteFood = async (userId, foodId) => {
  if (!userId && !foodId) {
    throw new errorResponse("UserId and foodId are required!", 400);
  }

  const isFavoriteFood = await Foods.queryGetIsFavoriteFood(userId, foodId);

  return isFavoriteFood;
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

  if (!addedFood) {
    throw new errorResponse(
      "Something went wrong while trying to add food!",
      400
    );
  }

  return addedFood;
};

const addFavoriteFood = async (userId, foodPayload) => {
  if ((!userId && Object.keys(foodPayload).length === 0) || !foodPayload) {
    throw new errorResponse("UserId and foodPayload are required!", 400);
  }

  const { foodId, foodName, foodBrand } = foodPayload;

  const favFoodId = uuidv4();

  const addFavoriteFood = await Foods.queryAddFavoriteFood(
    favFoodId,
    foodId,
    userId,
    foodName,
    foodBrand
  );

  if (!addFavoriteFood) {
    throw new errorResponse(
      "Something went wrong while trying to add favorite food!",
      400
    );
  }

  return addFavoriteFood;
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

const deleteFavoriteFood = async (favFoodId) => {
  if (!favFoodId) {
    throw new errorResponse("FavFoodId is required!", 400);
  }

  const deletedFavoriteFood = await Foods.queryDeleteFavoriteFood(favFoodId);

  if (!deletedFavoriteFood) {
    throw new errorResponse(
      "Something went wrong while trying to delete favorite food!",
      500
    );
  }

  return deletedFavoriteFood;
};

module.exports = {
  getAllFood,
  getFavoriteFood,
  getIsFavoriteFood,
  getLogDates,
  addFood,
  addFavoriteFood,
  updateFood,
  deleteFood,
  deleteFavoriteFood,
};
