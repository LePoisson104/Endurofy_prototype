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
  const foodData = req.body;

  try {
    await foodDiaryServices.addFood(userId, foodData);
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

module.exports = { getAllFood, addFood, updateFood, deleteFood };
