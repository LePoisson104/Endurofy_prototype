const userService = require("../services/userService");

const getUserInfoById = async (req, res) => {
  const { userId } = req.params;

  try {
    const getUserInfo = await userService.getUserInfoById(userId);
    return res.status(200).json(getUserInfo);
  } catch (err) {
    const statusCode = err.statusCode || 500; // default to 500 if not provided
    return res.status(statusCode).json({ message: err.message });
  }
};

const updateUserAccount = async (req, res) => {
  const { userId } = req.params;
  const userData = ({
    email,
    newEmail,
    currentPassword,
    newPassword,
    firstName,
    lastName,
  } = req.body);

  try {
    await userService.updateUserAccount(userId, userData);

    return res.status(200).json({ message: "User Updated Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

// close account
const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body; // required email for authenticate

  try {
    await userService.deleteUserAccount(userId, {
      email,
      password,
    });

    return res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
  }
};

module.exports = { getUserInfoById, updateUserAccount, deleteUserAccount };
