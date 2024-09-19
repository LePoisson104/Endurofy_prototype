const Users = require("../models/userModels");
const bycrypt = require("bcrypt");

const getUserInfoById = async (userId) => {
  if (!userId) {
    throw new Error("Required UserId");
  }

  const getUserInfo = await Users.queryGetAllUsers(userId);
  if (getUserInfo.length === 0) {
    throw new Error("User Not Found!");
  }

  return getUserInfo;
};

module.exports = {
  getUserInfoById,
};
