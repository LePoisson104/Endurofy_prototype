const foodDiaryServices = require("../services/foodDiaryServices");
const controllerErrorResponse = require("../utils/controllerErrorResponse");

////////////////////////////////////////////////////////////////////////////////////////////////
// @GET CONTROLLERS
////////////////////////////////////////////////////////////////////////////////////////////////
const getAllFood = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  try {
    const getAllFoods = await foodDiaryServices.getAllFood(userId, date);
    return res.status(200).json(getAllFoods);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getFavoriteFood = async (req, res) => {
  const { userId } = req.params;

  try {
    const getFavorites = await foodDiaryServices.getFavoriteFood(userId);
    return res.status(200).json(getFavorites);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getIsFavoriteFood = async (req, res) => {
  const { userId } = req.params;
  const { foodId } = req.query;

  try {
    const result = await foodDiaryServices.getIsFavoriteFood(userId, foodId);

    return res.status(200).json(result);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getLogDates = async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const foodDates = await foodDiaryServices.getLogDates(
      userId,
      startDate,
      endDate
    );
    return res.status(200).json(foodDates);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getCustomFood = async (req, res) => {
  const { userId } = req.params;

  try {
    const customFood = await foodDiaryServices.getCustomFood(userId);
    return res.status(200).json(customFood);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getCustomFoodById = async (req, res) => {
  const { foodId } = req.params;

  try {
    const customFoodById = await foodDiaryServices.getCustomFoodById(foodId);
    return res.status(200).json(customFoodById);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @POST CONTROLLERS
////////////////////////////////////////////////////////////////////////////////////////////////
const addFood = async (req, res) => {
  const { userId } = req.params;
  const foodPayload = req.body;

  try {
    await foodDiaryServices.addFood(userId, foodPayload);
    return res.status(200).json({ message: "Food Added Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const addFavoriteFood = async (req, res) => {
  const { userId } = req.params;
  const foodPayload = req.body;

  try {
    await foodDiaryServices.addFavoriteFood(userId, foodPayload);
    return res
      .status(200)
      .json({ message: "Favorite Food Added Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const addCustomFood = async (req, res) => {
  const { userId } = req.params;
  const foodPayload = req.body;

  try {
    await foodDiaryServices.addCustomFood(userId, foodPayload);
    return res.status(200).json({ message: "Custom food added successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @PATCH CONTROLLERS
////////////////////////////////////////////////////////////////////////////////////////////////
const updateFood = async (req, res) => {
  const { foodId } = req.params;
  const updatePayload = req.body;

  try {
    await foodDiaryServices.updateFood(foodId, updatePayload);
    return res.status(200).json({ message: "Food Updated Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const updateCustomFood = async (req, res) => {
  const { customFoodId } = req.params;
  const updatePayload = req.body;

  try {
    await foodDiaryServices.updateCustomFood(customFoodId, updatePayload);
    return res
      .status(200)
      .json({ message: "Custom food updated successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @DELETE CONTROLLERS
////////////////////////////////////////////////////////////////////////////////////////////////
const deleteFood = async (req, res) => {
  const { foodId } = req.params;

  try {
    await foodDiaryServices.deleteFood(foodId);
    return res.status(200).json({ message: "Food Deleted Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const deleteFavoriteFood = async (req, res) => {
  const { favFoodId } = req.params;

  try {
    await foodDiaryServices.deleteFavoriteFood(favFoodId);
    return res
      .status(200)
      .json({ message: "Favorite Food Deleted Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const deleteCustomFood = async (req, res) => {
  const { customFoodId } = req.params;

  try {
    await foodDiaryServices.deleteCustomFood(customFoodId);
    return res
      .status(200)
      .json({ message: "Custom food delete successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
// @SEARCH FOOD (GET METHOD)
////////////////////////////////////////////////////////////////////////////////////////////////
const searchFood = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${process.env.FDC_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.log("Error fetching food data: ", err);
    return res.status(500).json({ message: "Error fetching food data" });
  }
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
  searchFood,
};
