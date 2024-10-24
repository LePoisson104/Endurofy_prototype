const foodDiaryServices = require("../services/foodDiaryServices");

const getAllFood = async (req, res) => {
  const { userId } = req.params;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const addFood = async (req, res) => {
  const { userId } = req.params;
  const { foodData } = req.body;

  try {
  } catch (err) {
    const stautsCode = err.stautsCode || 500;
    return res.status(stautsCode).json({ message: err.message });
  }
};

const updateFood = async (req, res) => {
  const { foodId } = req.params;
  const { foodData } = req.body;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const deleteFood = async (req, res) => {
  const { foodId } = req.params;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

module.exports = { getAllFood, addFood, updateFood, deleteFood };
