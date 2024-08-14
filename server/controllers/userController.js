const bcrypt = require("bcrypt");
const Users = require("../models/userModels");

const getAllUsers = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const getUsers = Users.queryGetAllUsers(email);
  getUsers.then((data) => {
    if (data.length === 0) {
      return res.status(400).json({ message: "User Not Found" });
    }
    res.status(200).json({ data: data });
  });
};

// todo: divide this into three cases where the user update name, or email, or password
const updateUserAccount = async (req, res) => {
  const { userId } = req.params;
  const { email, currentPassword, newPassword, first_name, last_name } =
    req.body;

  if (!password || !email || !first_name || !last_name) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const updateDate = new Date();
  const hashed_password = await bcrypt.hash(newPassword, 10);
  const updateUser = Users.queryUpdateUserAccount(
    userId,
    email,
    hashed_password,
    first_name,
    last_name,
    updateDate
  );
  updateUser
    .then((status) => {
      if (status.affectedRows !== 1) {
        return res.status(400).json({ message: "Invalid User ID" });
      }
      res.status(200).json({ message: "User Updated Successfully!" });
    })
    .catch((err) => console.error(err));
};

// close account
const deleteUser = (req, res) => {
  const { userId } = req.params;
  const deleteUser = Users.queryDeleteUser(userId);
  deleteUser
    .then((status) => {
      if (status.affectedRows !== 1) {
        return res.status(400).json({ message: "Invalid User Id" });
      }
      res.status(200).json({ message: "User Deleted Successfully!" });
    })
    .catch((err) => console.error(err));
};

module.exports = { getAllUsers, updateUserAccount, deleteUser };
