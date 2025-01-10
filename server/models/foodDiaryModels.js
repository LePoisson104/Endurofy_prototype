const { response } = require("express");
const pool = require("../utils/db");

////////////////////////////////////////////////////////////////////////////////////////////////
// @GET QUERIES
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

const queryGetFavoriteFood = async (userId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT fav_food_id, food_id, food_brand, food_name FROM favoriteFood WHERE user_id = ?";
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

const queryGetIsFavoriteFood = async (userId, foodId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        " SELECT * FROM favoriteFood WHERE user_id = ? AND food_id = ?";
      pool.query(query, [userId, foodId], (err, results) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(results); // Return true if count > 0
        }
      });
    });
    return response; // Returns true if the food ID is in favorites
  } catch (err) {
    console.log(err.message);
  }
};

const queryGetLogDates = async (userId, startDate, endDate) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT DISTINCT DATE(logged_at) as logged_date FROM (SELECT logged_at FROM foodLog WHERE user_id = ? AND DATE(logged_at) BETWEEN ? AND ? UNION SELECT logged_at FROM waterLog WHERE user_id = ? AND DATE(logged_at) BETWEEN ? AND ?) AS combined_logs ORDER BY logged_date";
      pool.query(
        query,
        [userId, startDate, endDate, userId, startDate, endDate],
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

const queryGetCustomFood = async (userId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT custom_food_id, food_name, food_brand, calories, protein, carbs, fat, serving_size, serving_unit FROM customFood WHERE user_id = ?";
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

const queryGetCustomFoodById = async (foodId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM customFood WHERE custom_food_id = ?";
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
////////////////////////////////////////////////////////////////////////////////////////////////
// @POST QUERIES
////////////////////////////////////////////////////////////////////////////////////////////////
const queryAddFood = async (
  foodId,
  userId,
  foodName,
  foodBrand,
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
        "INSERT INTO foodLog (food_id, user_id, food_name, calories, protein, carbs, fat, serving_size, serving_unit, meal_type, logged_at, food_brand) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
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
          foodBrand,
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

const queryAddFavoriteFood = async (
  favFoodId,
  foodId,
  userId,
  foodName,
  foodBrand
) => {
  try {
    const reponse = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO favoriteFood (fav_food_id, food_id, user_id, food_name, food_brand) VALUES (?,?,?,?,?)";
      pool.query(
        query,
        [favFoodId, foodId, userId, foodName, foodBrand],
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

const queryAddCustomFood = async (
  customFoodId,
  userId,
  foodName,
  foodBrand,
  calories,
  protein,
  carbs,
  fat,
  servingSize,
  servingUnit
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO customFood (custom_food_id, user_id, food_name, food_brand, calories, protein, carbs, fat, serving_size, serving_unit) VALUES (?,?,?,?,?,?,?,?,?,?)";
      pool.query(
        query,
        [
          customFoodId,
          userId,
          foodName,
          foodBrand,
          calories,
          protein,
          carbs,
          fat,
          servingSize,
          servingUnit,
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
// @PATCH QUERIES
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

const queryUpdateCustomFood = async (customFoodId, updatePayload) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "UPDATE customFood SET ? WHERE custom_food_id = ?";
      pool.query(query, [updatePayload, customFoodId], (err, results) => {
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
// @DELETE QUERIES
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

const queryDeleteFavoriteFood = async (favFoodId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM favoriteFood WHERE fav_food_id = ?";
      pool.query(query, [favFoodId], (err, results) => {
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

const queryDeleteCustomFood = async (customFoodId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM customFood WHERE custom_food_id = ?";
      pool.query(query, [customFoodId], (err, results) => {
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
  queryGetFavoriteFood,
  queryGetLogDates,
  queryGetIsFavoriteFood,
  queryGetCustomFood,
  queryGetCustomFoodById,
  queryAddFood,
  queryAddFavoriteFood,
  queryAddCustomFood,
  queryUpdateFood,
  queryUpdateCustomFood,
  queryDeleteFood,
  queryDeleteFavoriteFood,
  queryDeleteCustomFood,
};
