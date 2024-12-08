const errorResponse = require("../utils/errorResponse");
const Water = require("../models/waterLogModels");
const { v4: uuidv4 } = require("uuid");

const getWaterIntake = async (userId, date) => {
  if (!userId && !date) {
    throw new errorResponse("UserId and date are required!", 400);
  }

  const waterIntake = await Water.queryGetWaterIntake(userId, date);

  if (waterIntake.lenth === 0) {
    throw new errorResponse("User Not Found!", 404);
  }

  return waterIntake;
};

const addWaterLog = async (userId, waterPayload) => {
  if (!userId || Object.keys(waterPayload).length === 0) {
    throw new errorResponse("UserId and waterPayload are required!", 400);
  }

  const { waterAmount, loggedAt } = waterPayload;
  const waterId = uuidv4();

  const isExistingWaterLog = await Water.queryCheckForExistingWaterLog(
    userId,
    loggedAt
  );

  if (isExistingWaterLog) {
    // Update the existing water log by adding the new amount
    const updatedWaterLog = await Water.queryUpdateWaterLog(
      isExistingWaterLog.water_id, // ID of the existing log
      isExistingWaterLog.water_amount + waterAmount, // Increment the water amount
      waterUnit
    );

    if (!updatedWaterLog) {
      throw new errorResponse("Failed to update the existing water log!", 400);
    }

    return updatedWaterLog; // Return the updated water log
  }

  // If no existing log, create a new water log
  const newWaterLog = await Water.queryAddWater(
    waterId,
    userId,
    waterAmount,
    waterUnit,
    loggedAt
  );

  if (!newWaterLog) {
    throw new errorResponse("Failed to add a new water log!", 400);
  }

  return newWaterLog; // Return the new water log
};

const updateWater = async (waterId, updatePayload) => {
  if (!waterId && !updatePayload) {
    throw new errorResponse("WaterId and updatePayload are Required!", 400);
  }

  const updatedWater = await Water.queryUpdateWaterIntake(
    waterId,
    updatePayload
  );

  return updatedWater;
};

module.exports = { getWaterIntake, addWaterLog, updateWater };
