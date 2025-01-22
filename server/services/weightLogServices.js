const errorResponse = require("../utils/errorResponse");
const Weight = require("../models/weightLogModels");
const { v4: uuidv4 } = require("uuid");
const { validDate } = require("../helper/validDate");

const getAllWeightLogs = async (userId) => {
  if (!userId) {
    throw new errorResponse("UserId is required!", 400);
  }

  const allWeightLogs = await Weight.queryGetAllWeightLogs(userId);

  if (!allWeightLogs) {
    throw new errorResponse(
      "Something went wrong while trying to get all weight logs",
      500
    );
  }

  return allWeightLogs;
};

const getWeightLogsByDates = async (userId, startDate, endDate) => {
  if (!userId && !startDate && !endDate) {
    throw new errorResponse("UserId, startDate, and endDate are requred!", 400);
  }

  if (validDate(startDate) === false) {
    throw new errorResponse("Invalid start date!", 400);
  }

  if (validDate(endDate) === false) {
    throw new errorResponse("Invalid start date!", 400);
  }

  const weightLogsByDates = await Weight.queryGetWeightLogsByDates(
    userId,
    startDate,
    endDate
  );

  if (!weightLogsByDates) {
    throw new errorResponse(
      "Something went wrong while trying to get weight logs by dates",
      500
    );
  }

  return weightLogsByDates;
};

const addWeightLog = async (userId, weightPayload) => {
  if (
    (!userId && !weightPayload) ||
    (Object.keys(weightPayload).length === 0 && !userId)
  ) {
    throw new errorResponse("UserId and weightPayload required!", 400);
  }

  const { recordedWeight, loggedAt } = weightPayload;

  if (recordedWeight === undefined || loggedAt === undefined) {
    throw new errorResponse(
      "Make sure recordedWeight and loggedAt is spelled correctly!",
      400
    );
  }

  if (validDate(loggedAt) === false) {
    throw new errorResponse("Invalid loggedAt", 400);
  }

  const weightLogId = uuidv4();

  const addedWeightLog = await Weight.queryAddWeightLog(
    weightLogId,
    userId,
    recordedWeight,
    loggedAt
  );

  if (!addedWeightLog) {
    const formattedDate = new Date(loggedAt).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    throw new errorResponse(
      `You have already logged your weight for the date: ${formattedDate}`,
      409
    );
  }

  return addWeightLog;
};

const updateWeightLog = async () => {
  return;
};

const deleteWeightLog = async () => {
  return;
};

module.exports = {
  getAllWeightLogs,
  getWeightLogsByDates,
  addWeightLog,
  updateWeightLog,
  deleteWeightLog,
};
