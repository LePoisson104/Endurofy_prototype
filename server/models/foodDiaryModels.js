const pool = require("../utils/db");

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryGetAllFood
////////////////////////////////////////////////////////////////////////////////////////////////
const queryGetAllFood = async (userId, date) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM foodLog WHERE user_id = ? AND DATE(logged_at) = ?";
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

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryAddFood
////////////////////////////////////////////////////////////////////////////////////////////////
const queryAddFood = async (
  foodId,
  userId,
  foodName,
  calories,
  protein,
  carbs,
  fat,
  servingSize,
  servingUnit,
  mealType,
  loggedAt
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO foodLog (food_id, user_id, food_name, calories, protein, carbs, fat, serving_size, serving_unit, meal_type, logged_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      pool.query(
        query,
        [
          foodId,
          userId,
          foodName,
          calories,
          protein,
          carbs,
          fat,
          servingSize,
          servingUnit,
          mealType,
          loggedAt,
        ],
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

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryUpdateFoodByID
////////////////////////////////////////////////////////////////////////////////////////////////
const queryUpdateFood = async (foodId, updatePayload) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE foodLog SET ? WHERE food_id = ?";
      pool.query(query, [updatePayload, foodId], (err, results) => {
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

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryDeleteFoodById
////////////////////////////////////////////////////////////////////////////////////////////////
const queryDeleteFood = async (foodId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM foodLog WHERE food_id = ?";
      pool.query(query, [foodId], (err, results) => {
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
  queryGetAllFood,
  queryAddFood,
  queryUpdateFood,
  queryDeleteFood,
};
