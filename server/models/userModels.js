const pool = require("../utils/db");

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryCreateNewUser
////////////////////////////////////////////////////////////////////////////////////////////////
const queryCreateNewUser = async (
  userId,
  email,
  hashed_password,
  firstName,
  lastName,
  gender,
  birthdate,
  height,
  weight
) => {
  try {
    const userResponse = await new Promise((resolve, reject) => {
      const userQuery =
        "INSERT INTO users (user_id, email, hashed_password, first_name, last_name) VALUES (?,?,?,?,?)";
      pool.query(
        userQuery,
        [
          userId,
          email,
          hashed_password,
          firstName,
          lastName,
          gender,
          birthdate,
          height,
          weight,
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

    await new Promise((resolve, reject) => {
      const profileQuery =
        "INSERT INTO userProfile (user_id, gender, birthdate, weight, height) VALUES (?,?,?,?,?)";
      pool.query(
        profileQuery,
        [userId, gender, birthdate, weight, height],
        (err, results) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(results);
          }
        }
      );
    });

    return userResponse;
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryGetAllUsers
////////////////////////////////////////////////////////////////////////////////////////////////
const queryGetAllUsers = async (userId) => {
  try {
    const userResponse = await new Promise((resolve, reject) => {
      const query =
        "SELECT user_id, email, first_name, last_name, updated_at FROM users WHERE user_id = ?";
      pool.query(query, [userId], (err, results) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(results);
        }
      });
    });

    const userProfileReponse = await new Promise((resolve, reject) => {
      const query =
        "SELECT gender, birthdate, height, weight, updated_at FROM userProfile WHERE user_id = ?";
      pool.query(query, [userId], (err, results) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(results);
        }
      });
    });

    return { userResponse, userProfileReponse };
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryGetUsersCredentials
////////////////////////////////////////////////////////////////////////////////////////////////
const queryGetUsersCredentials = async (email) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT email, hashed_password, first_name FROM users WHERE email = ?";
      pool.query(query, [email], (err, results) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryUpdateUsers
////////////////////////////////////////////////////////////////////////////////////////////////
const queryUpdateUsers = async (userId, updatePayload, table) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = `UPDATE ${table} SET ? WHERE user_id = ?`;
      const values = [updatePayload, userId];
      pool.query(query, values, (err, results) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @queryDeleteUser
////////////////////////////////////////////////////////////////////////////////////////////////
const queryDeleteUser = async (userID) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE user_id = ?";
      pool.query(query, [userID], (err, results) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(results);
        }
      });
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  queryCreateNewUser,
  queryGetAllUsers,
  queryUpdateUsers,
  queryDeleteUser,
  queryGetUsersCredentials,
};
