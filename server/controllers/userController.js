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

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { password, name } = req.body;

  if (!password || !name) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const updateUser = Users.queryUpdateUser(userId, hashed_password, name);
  updateUser
    .then((status) => {
      if (status.affectedRows !== 1) {
        return res.status(400).json({ message: "Invalid User ID" });
      }
      res.status(200).json({ message: "User Updated Successfully!" });
    })
    .catch((err) => console.error(err));
};

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

module.exports = { getAllUsers, updateUser, deleteUser };
