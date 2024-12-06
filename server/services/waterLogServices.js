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
  console.log("hello");

  // if (!userId || Object.keys(waterPayload).length === 0) {
  //   throw new errorResponse("UserId and waterPayload are required!", 400);
  // }

  const { waterAmount, loggedAt } = waterPayload;
  const waterId = uuidv4();

  const isExistingWaterLog = await Water.queryCheckForExistingWaterLog(
    userId,
    loggedAt
  );

  console.log(isExistingWaterLog);

  // const addWaterIntake = await Water.queryAddWater(
  //   waterId,
  //   userId,
  //   waterAmount,
  //   loggedAt
  // );

  // if (!addWaterIntake) {
  //   throw new errorResponse("Something Went Wrong!", 400);
  // }

  // return addWaterIntake;
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

module.export = { getWaterIntake, addWaterLog, updateWater };
