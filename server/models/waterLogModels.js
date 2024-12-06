const pool = require("../utils/db");

const queryGetWaterIntake = async (userId, date) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM waterLog user_id = ? AND DATE(logged_at) = ?";
      pool.query(query, [userId, date], (err, results) => {
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

const queryAddWater = async (waterId, userId, waterAmount, loggedAt) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO waterLog (water_id, user_id, water_amount, logged_at) VALUES (?,?,?,?)";
      pool.query(
        query,
        [waterId, userId, waterAmount, loggedAt],
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

const queryUpdateWaterIntake = async (waterId, updatePayload) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE waterLog SET ? WHERE water_id = ?";
      pool.query(query, [updatePayload, waterId], (err, results) => {
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

const queryCheckForExistingWaterLog = async (waterId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM waterLog WHERE water_id = ?"; // Query to check existence
      pool.query(query, [waterId], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results.length > 0); // Returns true if a record exists, false otherwise
        }
      });
    });
    return response; // true if exists, false otherwise
  } catch (err) {
    console.log(err.message);
    return false; // Default return value in case of an error
  }
};

module.exports = {
  queryGetWaterIntake,
  queryAddWater,
  queryUpdateWaterIntake,
  queryCheckForExistingWaterLog,
};
