const userService = require("../services/userService");

const getUserInfoById = async (req, res) => {
  const { userId } = req.params;

  try {
    const getUserInfo = await userService.getUserInfoById(userId);
    return res.status(200).json(getUserInfo);
  } catch (err) {
    const statusCode = err.statusCode || 500; // default to 500 if not provided
    return res.status(statusCode).json({ error: err.message });
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

    return res
      .status(200)
      .json({ message: "User Account Updated Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message });
  }
};

// const updateUserAccountSettings = async (req, res) => {
//   const { userId } = req.params;
//   const userData = ({ appearance, notification } = req.body); // dark or light mode and true or false

//   try {
//     await userService.updateUserAccountSettings(userId, userData);
//     return res
//       .status(200)
//       .json({ message: "User Target Updated Successfully!" });
//   } catch (err) {
//     const statusCode = err.statusCode || 500;
//     return res.status(statusCode).json({ error: err.message });
//   }
// };

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const userData = ({ gender, birthdate, height, weight } = req.body);

  try {
    await userService.updateUserProfile(userId, userData);
    return res
      .status(200)
      .json({ mesage: "User Profile Updated Successfully! " });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message });
  }
};

const updateUserTarget = async (req, res) => {
  const { userId } = req.params;
  const userData = ({ caloriesTarget, weightGoal, protein, carbs, fat } =
    req.body);

  try {
    await userService.updateUserTarget(userId, userData);
    return res
      .status(200)
      .json({ message: "User Target Updated Successfully!" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message });
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
    return res.status(statusCode).json({ error: err.message });
  }
};

module.exports = {
  getUserInfoById,
  updateUserAccount,
  // updateUserAccountSettings,
  updateUserProfile,
  updateUserTarget,
  deleteUserAccount,
};
