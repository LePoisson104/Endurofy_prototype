const Users = require("../models/userModels");
const bycrypt = require("bcrypt");
const errorResponse = require("../utils/errorResponse");

const getUserCredentials = async (email, currentPassword) => {
  if (!email || !currentPassword) {
    throw new errorResponse("email and password is Required!", 400);
  }

  const getCredentials = await Users.queryGetUsersCredentials(email);
  if (getCredentials.length === 0) {
    throw new errorResponse("User Not Found!", 404);
  }

  const match = await bycrypt.compare(
    currentPassword,
    getCredentials[0].hashed_password
  );
  // return true or false
  return { getCredentials, match };
};

const getUserInfoById = async (userId) => {
  if (!userId) {
    throw new errorResponse("userId is Required!", 400);
  }

  const getUserInfo = await Users.queryGetAllUsers(userId);

  if (getUserInfo.length === 0) {
    throw new errorResponse("User Not Found!", 404);
  }

  return getUserInfo;
};

// todo: when changing email need to send email to old account and wait for confirmation code to be enter
const updateUserAccount = async (userId, userData) => {
  const { email, newEmail, currentPassword, newPassword, firstName, lastName } =
    userData;

  if (!userId) {
    throw new errorResponse("userId is Required!", 400);
  }

  const updatePayload = {};
  const updateDate = new Date(); // date that the user update their info

  if (
    email &&
    newEmail &&
    currentPassword &&
    !newPassword &&
    !firstName &&
    !lastName
  ) {
    const { match } = await getUserCredentials(email, currentPassword);

    if (!match) {
      throw new errorResponse("Password Does Not Match!", 401);
    }

    updatePayload.email = newEmail;
    updatePayload.update_at = updateDate;
  }

  if (
    firstName &&
    lastName &&
    !email &&
    !newEmail &&
    !currentPassword &&
    !newPassword
  ) {
    updatePayload.first_name = firstName;
    updatePayload.last_name = lastName;
    updatePayload.update_at = updateDate;
  }

  if (
    email &&
    currentPassword &&
    newPassword &&
    !newEmail &&
    !firstName &&
    !lastName
  ) {
    const match = await getUserCredentials(email, currentPassword);

    if (!match) {
      throw new errorResponse("Password Does Not Match!", 401); // unauthorized
    }

    const hashed_password = await bycrypt.hash(newPassword, 10); // 10 salts
    updatePayload.hashed_password = hashed_password;
    updatePayload.update_at = updateDate;
  }

  if (Object.keys(updatePayload).length === 0) {
    throw new errorResponse("No Fields to Update", 400);
  }

  const updateUser = await Users.queryUpdateUserAccount(userId, updatePayload);

  if (!updateUser) {
    throw new errorResponse("Duplicate Email!", 409); // conflict
  }

  if (updateUser.affectedRows !== 1) {
    throw new errorResponse("userId Does Not Match!", 404); // not found
  }

  return updateUser;
};

const deleteUserAccount = async (userId, userData) => {
  const { email, password } = userData;

  if (!userId || !email || !password) {
    throw new errorResponse("Required userId, email, and password!", 400);
  }

  const match = await getUserCredentials(email, password);

  if (!match) {
    throw new errorResponse("Password Does Not Match!", 401); // unauthorized
  }

  const deleteUser = await Users.queryDeleteUser(userId);

  if (deleteUser.affectedRows !== 1) {
    throw new errorResponse("Invalid User ID!", 400);
  }

  return deleteUser;
};

module.exports = {
  getUserInfoById,
  getUserCredentials,
  updateUserAccount,
  deleteUserAccount,
};
