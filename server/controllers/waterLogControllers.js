const waterLogServices = require("../services/waterLogServices");

// water log
const getWaterIntake = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  try {
    const waterLogData = await waterLogServices.getWaterIntake(userId, date);
    return res.status(200).json(waterLogData);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

const addWater = async (req, res) => {
  const { userId } = req.params;
  const waterPayload = req.body;

  try {
    await waterLogServices.addWaterLog(userId, waterPayload);
    return res.status(200).json({ message: "Water added successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.mesage });
  }
};

const updateWaterIntake = async (req, res) => {
  const { waterId } = req.params;
  const updatePayload = req.body;

  try {
    await waterLogServices.updateWater(waterId, updatePayload);
    return res.status(200).json({ message: "Water log updated successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

module.exports = {
  getWaterIntake,
  addWater,
  updateWaterIntake,
};
