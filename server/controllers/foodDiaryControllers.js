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

module.exports = { getAllFood, addFood, updateFood, deleteFood, searchFood };
