const pool = require("../utils/db");

const queryGetAllWeightLogs = async (userId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM weightLog WHERE user_id = ?";
      pool.query(query, [userId], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

// get weight logs based on the date range
const queryGetWeightLogsByDates = async (userId, startDate, endDate) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM weightLog WHERE user_id = ? AND logged_at BETWEEN ? AND ?";
      pool.query(query, [userId, startDate, endDate], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

const queryAddWeightLog = async (
  weightLogId,
  userId,
  recordedWeight,
  loggedAt
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO weightLog (weight_log_id, user_id, recorded_weight, logged_at) VALUES (?,?,?,?)";
      pool.query(
        query,
        [weightLogId, userId, recordedWeight, loggedAt],
        (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              reject(new Error("Duplicate entry for loggedAt"));
            } else {
              reject(new Error(err.message));
            }
          } else {
            resolve(results);
          }
        }
      );
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

const queryUpdateWeightLog = async (weightLogId, updatePayload) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE weightLog SET ? WHERE weight_log_id = ?";
      pool.query(query, [updatePayload, weightLogId], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

const queryDeleteWeightLog = async (weightLogId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM weightLog WHERE weight_log_id = ?";
      pool.query(query, [weightLogId], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  queryGetWeightLogsByDates,
  queryGetAllWeightLogs,
  queryAddWeightLog,
  queryUpdateWeightLog,
  queryDeleteWeightLog,
};
