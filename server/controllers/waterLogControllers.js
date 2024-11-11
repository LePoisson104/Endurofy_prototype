const waterLogServices = require("../services/waterLogServices");

// water log
const getWaterIntake = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const addWater = async (req, res) => {
  const { userId } = req.params;
  const waterPayload = req.body;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.mesage });
  }
};

const updateWaterIntake = async (req, res) => {
  const { waterId } = req.params;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const deleteWater = async (req, res) => {
  const { foodId } = req.params;

  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

module.exports = {
  getWaterIntake,
  addWater,
  updateWaterIntake,
  deleteWater,
};
