const errorResponse = require("../utils/errorResponse");
const Foods = require("../models/foodDiaryModels");
const { v4: uuidv4 } = require("uuid");

////////////////////////////////////////////////////////////////////////////////////////////////
// @GET SERVICES
////////////////////////////////////////////////////////////////////////////////////////////////
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

  if (isFavoriteFood.length === 0) {
    return { isFavorite: false };
  }

  return { isFavorite: true, data: isFavoriteFood };
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

const getCustomFood = async (userId) => {
  if (!userId) {
    throw new errorResponse("UserId is required!", 400);
  }

  const customFood = await Foods.queryGetCustomFood(userId);

  if (!customFood) {
    throw new errorResponse(
      "Something went wrong while trying to get custom food!",
      500
    );
  }

  return customFood;
};

const getCustomFoodById = async (foodId) => {
  if (!foodId) {
    throw new errorResponse("FoodId is required!", 400);
  }

  const customFoodById = await Foods.queryGetCustomFoodById(foodId);

  return customFoodById;
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @POST SERVICES
////////////////////////////////////////////////////////////////////////////////////////////////
const addFood = async (userId, foodPayload) => {
  if (!userId && Object.keys(foodPayload).length === 0) {
    throw new errorResponse("UserId and foodPayload are required!", 400);
  }

  const {
    fdcId,
    foodName,
    foodBrand,
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
    fdcId,
    userId,
    foodName,
    foodBrand,
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

const addCustomFood = async (userId, foodPayload) => {
  if ((!userId && Object.keys(foodPayload).length === 0) || !foodPayload) {
    throw new errorResponse("UserId and foodPayload are required!", 400);
  }

  const {
    foodName,
    foodBrand,
    calories,
    protein,
    carbs,
    fat,
    servingSize,
    servingUnit,
  } = foodPayload;

  const customFoodId = uuidv4();

  const addCustom = await Foods.queryAddCustomFood(
    customFoodId,
    userId,
    foodName,
    foodBrand,
    calories,
    protein,
    carbs,
    fat,
    servingSize,
    servingUnit
  );

  if (!addCustom) {
    throw new errorResponse(
      "Something went wrong while trying to add custom food!",
      400
    );
  }

  return addCustom;
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @PATCH SERVICES
////////////////////////////////////////////////////////////////////////////////////////////////
const updateFood = async (foodId, updatePayload) => {
  if ((!foodId && Object.keys(updatePayload).length === 0) || !updatePayload) {
    throw new errorResponse("foodId and foodPayload are required!", 400);
  }

  const { serving_size, serving_unit } = updatePayload;

  if (!serving_size || !serving_unit) {
    throw new errorResponse(
      "Make sure variable names are spelled correctly (serving_size, serving_unit)",
      400
    );
  }
  const updatedFood = await Foods.queryUpdateFood(foodId, updatePayload);

  if (!updatedFood) {
    throw new errorResponse(
      "Something went wrong while trying to update food!",
      500
    );
  }

  return updatedFood;
};

const updateCustomFood = async (customFoodId, updatePayload) => {
  if (
    (!customFoodId && Object.keys(updatePayload).length === 0) ||
    !updatePayload
  ) {
    throw new errorResponse("customFoodId and foodPayload are required!", 400);
  }

  const {
    food_name,
    food_brand,
    calories,
    protein,
    carbs,
    fat,
    serving_size,
    serving_unit,
  } = updatePayload;

  if (
    !food_name ||
    !food_brand ||
    !calories ||
    !protein ||
    !carbs ||
    !fat ||
    !serving_size ||
    !serving_unit
  ) {
    throw new errorResponse(
      "Make sure your varible names are spelled correctly (food_name, food_brand, calories, protein, carbs, fat, serving_size, serving_unit)",
      400
    );
  }

  const updatedCustomFood = await Foods.queryUpdateCustomFood(
    customFoodId,
    updatePayload
  );

  if (!updatedCustomFood) {
    throw new errorResponse(
      "Something went wrong while trying to update custom food!",
      500
    );
  }

  return updatedCustomFood;
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @DELETE SERVICES
////////////////////////////////////////////////////////////////////////////////////////////////
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

const deleteCustomFood = async (customFoodId) => {
  if (!customFoodId) {
    throw new errorResponse("customFoodId is required!", 400);
  }

  const deletedCustomFood = await Foods.queryDeleteCustomFood(customFoodId);

  if (!deletedCustomFood) {
    throw new errorResponse(
      "Something went wrong while trying to delete custom food!",
      500
    );
  }

  return deletedCustomFood;
};

module.exports = {
  getAllFood,
  getFavoriteFood,
  getIsFavoriteFood,
  getLogDates,
  getCustomFood,
  getCustomFoodById,
  addFood,
  addFavoriteFood,
  addCustomFood,
  updateFood,
  updateCustomFood,
  deleteFood,
  deleteFavoriteFood,
  deleteCustomFood,
};
