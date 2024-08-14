const pool = require("../utils/db");

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
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (user_id, email, hashed_password, first_name, last_name, gender, birth_date, height, weight) VALUES (?,?,?,?,?,?,?,?,?)";
      pool.query(
        query,
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
    return response;
  } catch (err) {
    console.error(err);
  }
};

const queryGetAllUsers = async (email) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT user_id, email, first_name, last_name, gender, birth_date, height, weight FROM users WHERE email = ?";
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

const queryUpdateUserAccount = async (
  userId,
  email,
  hashedPassword,
  first_name,
  last_name,
  updateDate
) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE users SET email = ?, hashed_password = ?, first_name = ?, last_name = ?, update_at = ? WHERE user_id = ?";
      pool.query(
        query,
        [email, hashedPassword, first_name, last_name, updateDate, userId],
        (err, results) => {
          if (err) {
            reject(new Error(err));
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
  queryUpdateUserAccount,
  queryDeleteUser,
  queryGetUsersCredentials,
};
