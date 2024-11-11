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

const addWater = async (userId, waterPayload) => {
  if (!userId || Object.keys(waterPayload).length === 0) {
    throw new errorResponse("UserId and waterPayload are required!", 400);
  }

  const { waterAmount, waterUnit } = waterPayload;

  const loggedAt = new Date();
  const waterId = uuidv4();

  const addWaterIntake = await Water.queryAddWater(
    waterId,
    userId,
    waterAmount,
    waterUnit,
    loggedAt
  );

  if (!addWaterIntake) {
    throw new errorResponse("Something Went Wrong!", 400);
  }

  return addWaterIntake;
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

const deleteWater = async (waterId) => {
  if (!waterId) {
    throw new errorResponse("WaterId is required!", 400);
  }

  const deletedWater = await Water.queryDeleteWaterIntake(waterId);

  return deletedWater;
};

module.export = { getWaterIntake, addWater, updateWater, deleteWater };
