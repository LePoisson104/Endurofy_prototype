const pool = require("../utils/db");

// get weight logs based on the date range
const queryGetWeightLogs = async (userId, startDate, endDate) => {
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
  weightId,
  userId,
  recordedWeight,
  loggedAt
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO weightLog (weight_id, user_id, recorded_weight, logged_at) VALUES (?,?,?,?)";
      pool.query(
        query,
        [weightId, userId, recordedWeight, loggedAt],
        (err, results) => {
          if (err) {
            reject(new Error(err.message));
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

const queryUpdateWeightLog = async (weightId, updatePayload) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE weightLog SET ? WHERE weight_id = ?";
      pool.query(query, [updatePayload, weightId], (err, results) => {
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

const queryDeleteWeightLog = async (weightId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM weightLog WHERE weight_id = ?";
      pool.query(query, [weightId], (err, results) => {
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
  queryGetWeightLogs,
  queryAddWeightLog,
  queryUpdateWeightLog,
  queryDeleteWeightLog,
};
