const bcrypt = require("bcrypt");
const Users = require("../models/userModels");
const { message } = require("prompt");

const getAllUserInfo = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Required userID" });
  }

  try {
    const getUsers = await Users.queryGetAllUsers(userId);
    if (getUsers.length === 0) {
      return res.status(404).json({ message: "User Not Found " });
    }

    return res.status(200).json(getUsers);
  } catch (err) {
    console.error(err);
  }
};

// todo: divide this into three cases where the user update name, or email, or password
const updateUserAccount = async (req, res) => {
  const { userId } = req.params;
  const { email, newEmail, currentPassword, newPassword, firstName, lastName } =
    req.body;

  if (!userId) {
    return res.status(400).json({ message: "Required UserID!" });
  }

  const updatePayload = {};
  const updateDate = new Date();

  if (newEmail) {
    updatePayload.email = newEmail;
    updatePayload.update_at = updateDate;
  }
  if (firstName && lastName) {
    updatePayload.first_name = firstName;
    updatePayload.last_name = lastName;
    updatePayload.update_at = updateDate;
  }
  if (email && currentPassword && newPassword) {
    try {
      const userCredentials = await Users.queryGetUsersCredentials(email);
      if (userCredentials.length === 0) {
        return res.status(404).json({ message: "User Not Found!" });
      }
      const match = await bcrypt.compare(
        currentPassword,
        userCredentials[0].hashed_password
      );

      if (!match) {
        return res.status(400).json({ message: "Password Does Not Match!" });
      }

      const hashed_password = await bcrypt.hash(newPassword, 10);
      updatePayload.hashed_password = hashed_password;
      updatePayload.update_at = updateDate;
    } catch (err) {
      console.error(err);
    }
  }

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const updateUser = await Users.queryUpdateUserAccount(
      userId,
      updatePayload
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Duplicate Email!" });
    }
    if (updateUser.affectedRows !== 1) {
      return res.status(400).json({ message: "UserID Does Not Match!" });
    }
    return res.status(200).json({ message: "User Update Successfully!" });
  } catch (err) {
    console.error(err);
  }
};

// close account
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;

  if (!userId || !email || !password) {
    return res.status(400).json("Required UserID, email, and password");
  }

  try {
    const isValidUser = await Users.queryGetUsersCredentials(email);

    if (isValidUser.length === 0) {
      return res.status(400).json({ message: "Email Does Not Match!" });
    }

    const match = await bcrypt.compare(
      password,
      isValidUser[0].hashed_password
    );

    if (!match) {
      return res.status(400).json({ message: "Password Does Not Match!" });
    }

    const deleteUser = await Users.queryDeleteUser(userId);

    if (deleteUser.affectedRows !== 1) {
      return res.status(400).json({ message: "Invalid User ID!" });
    }
    return res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllUserInfo, updateUserAccount, deleteUser };
