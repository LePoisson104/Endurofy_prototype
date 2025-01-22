const controllerErrorResponse = require("../utils/controllerErrorResponse");
const weightLogServices = require("../services/weightLogServices");

const getAllWeightLogs = async (req, res) => {
  const { userId } = req.params;

  try {
    const allWeightLogs = await weightLogServices.getAllWeightLogs(userId);
    return res.status(200).json(allWeightLogs);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const getWeightLogsByDates = async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const addWeightLog = async (req, res) => {
  const { userId } = req.params;
  const weightPayload = req.body;

  try {
    await weightLogServices.addWeightLog(userId, weightPayload);
    return res.status(200).json({ message: "Weight log added successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const updateWeightLog = async (req, res) => {
  const { weightLogId } = req.params;
  const updatePayload = req.body;

  try {
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

const deleteWeightLog = async (req, res) => {
  const weightLogId = req.params;

  try {
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

module.exports = {
  getAllWeightLogs,
  getWeightLogsByDates,
  addWeightLog,
  updateWeightLog,
  deleteWeightLog,
};
