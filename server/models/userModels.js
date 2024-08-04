const pool = require("../utils/db");

const queryCreateNewUser = async (userId, email, hashed_password, name) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (user_id, email, hashed_password, name) VALUES (?,?,?,?)";
      pool.query(
        query,
        [userId, email, hashed_password, name],
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
    console.error(err);
  }
};

const queryGetAllUsers = async (email) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT user_id, email, name FROM users WHERE email = ?";
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

const queryGetUsersCredentials = async (email) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT email, hashed_password, name FROM users WHERE email = ?";
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

const queryUpdateUser = async (userId, hashedPassword, name) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE users SET hashed_password = ?, name = ? WHERE user_id = ?";
      pool.query(query, [hashedPassword, name, userId], (err, results) => {
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
  queryUpdateUser,
  queryDeleteUser,
  queryGetUsersCredentials,
};
