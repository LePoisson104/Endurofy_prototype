const foodDiaryServices = require("../services/foodDiaryServices");

const getAllFood = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  try {
    const getAllFoods = await foodDiaryServices.getAllFood(userId, date);
    return res.status(200).json(getAllFoods);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const getFavoriteFood = async (req, res) => {
  const { userId } = req.params;

  try {
    const getFavorites = await foodDiaryServices.getFavoriteFood(userId);
    return res.status(200).json(getFavorites);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const getIsFavoriteFood = async (req, res) => {
  const { userId } = req.params;
  const { foodId } = req.query;

  try {
    const result = await foodDiaryServices.getIsFavoriteFood(userId, foodId);

    return res.status(200).json(result);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
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
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const addFood = async (req, res) => {
  const { userId } = req.params;
  const foodPayload = req.body;

  try {
    await foodDiaryServices.addFood(userId, foodPayload);
    return res.status(200).json({ message: "Food Added Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
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
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const updateFood = async (req, res) => {
  const { foodId } = req.params;
  const updatePayload = req.body;

  try {
    await foodDiaryServices.updateFood(foodId, updatePayload);
    return res.status(200).json({ message: "Food Updated Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const deleteFood = async (req, res) => {
  const { foodId } = req.params;

  try {
    await foodDiaryServices.deleteFood(foodId);
    return res.status(200).json({ message: "Food Deleted Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
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
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

// search food
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
  addFood,
  addFavoriteFood,
  updateFood,
  deleteFood,
  deleteFavoriteFood,
  searchFood,
};
