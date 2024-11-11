const pool = require("../utils/db");

const queryGetWaterIntake = async (userId, date) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM waterLog user_id = ? AND DATE(logges_at) = ?";
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

const queryAddWater = async (
  waterId,
  userId,
  waterAmount,
  waterUnit,
  loggedAt
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO waterLog (water_id, user_id, water_amount, water_unit, logged_at) VALUES (?,?,?,?,?)";
      pool.query(
        query,
        [waterId, userId, waterAmount, waterUnit, loggedAt],
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

const queryDeleteWaterIntake = async (waterId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM waterLog WHERE water_id = ?";
      pool.query(query, [waterId], (err, results) => {
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
  queryGetWaterIntake,
  queryAddWater,
  queryUpdateWaterIntake,
  queryDeleteWaterIntake,
};
