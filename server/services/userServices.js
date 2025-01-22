const Users = require("../models/userModels");
const bycrypt = require("bcrypt");
const errorResponse = require("../utils/errorResponse");
const { BMR } = require("../helper/BMR");
const { passwordRegex } = require("../helper/passwordRegex");
const { validDate } = require("../helper/validDate");

////////////////////////////////////////////////////////////////////////////////////////////////
// @getUserCredentials
////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////
// @getUserInfoId
////////////////////////////////////////////////////////////////////////////////////////////////
const getUserInfoById = async (userId) => {
  if (!userId) {
    throw new errorResponse("userId is Required!", 400);
  }

  const getUserInfo = await Users.queryGetAllUsers(userId);

  if (
    getUserInfo.userResponse.length === 0 &&
    getUserInfo.userProfileReponse.length === 0
  ) {
    throw new errorResponse("User Not Found!", 404);
  }

  const combinedData = {
    ...getUserInfo.userResponse[0],
    ...getUserInfo.userProfileReponse[0],
    user_updated_at: getUserInfo.userResponse[0].updated_at,
    profile_updated_at: getUserInfo.userProfileReponse[0].updated_at,
  };

  delete combinedData.updated_at;

  return combinedData;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//@updateUserAccount
////////////////////////////////////////////////////////////////////////////////////////////////
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
    updatePayload.updated_at = updateDate;
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
    updatePayload.updated_at = updateDate;
  }

  if (
    email &&
    currentPassword &&
    newPassword &&
    !newEmail &&
    !firstName &&
    !lastName
  ) {
    const { match } = await getUserCredentials(email, currentPassword);

    if (!match) {
      throw new errorResponse("Password Does Not Match!", 401); // unauthorized
    }

    if (passwordRegex(newPassword) === false) {
      throw new errorResponse(
        "Password must be at least 10 characters long",
        400
      );
    }

    const hashed_password = await bycrypt.hash(newPassword, 10); // 10 salts
    updatePayload.hashed_password = hashed_password;
    updatePayload.updated_at = updateDate;
  }

  if (Object.keys(updatePayload).length === 0) {
    throw new errorResponse("No Fields to Update", 400);
  }

  const updateUser = await Users.queryUpdateUsers(
    userId,
    updatePayload,
    "users"
  );

  if (!updateUser) {
    throw new errorResponse(`This email is already in use: ${newEmail}`, 409);
  }

  if (updateUser.affectedRows !== 1) {
    throw new errorResponse("userId Does Not Match!", 404); // not found
  }

  return updateUser;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @updateUserAccountSettings
////////////////////////////////////////////////////////////////////////////////////////////////
// const updateUserAccountSettings = async (userId, userData) => {};

////////////////////////////////////////////////////////////////////////////////////////////////
// @updateUserProfile
////////////////////////////////////////////////////////////////////////////////////////////////
const updateUserProfile = async (userId, userData) => {
  const { gender, birthdate, height, weight } = userData;

  if (!userId) {
    throw new errorResponse("userId is Required!", 400);
  }

  if (!gender || !birthdate || !height || !weight) {
    throw new errorResponse("All Fields Are Required!", 400);
  }

  if (validDate(birthdate) === false) {
    throw new errorResponse("Invalid date", 400);
  }

  const updateDate = new Date();
  const newBMR = BMR(gender, birthdate, height, weight);
  userData.updated_at = updateDate;
  userData.BMR = newBMR;

  const updateUserProfile = await Users.queryUpdateUsers(
    userId,
    userData,
    "userProfile"
  );

  if (updateUserProfile.affectedRows !== 1) {
    throw new errorResponse("userId Does Not Match!", 400);
  }

  return updateUserProfile;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @updateUserTarget
////////////////////////////////////////////////////////////////////////////////////////////////
const updateUserTarget = async (userId, userData) => {
  const { calories, weightGoal, protein, carbs, fat, activity_level } =
    userData;
  const updatePayload = {};

  if (!userId) {
    throw new errorResponse("userId is Required!", 400);
  }

  // Allow calories and weightGoal to be set without macronutrients
  if (
    calories &&
    weightGoal &&
    protein === undefined &&
    carbs === undefined &&
    fat === undefined
  ) {
    updatePayload.calories_target = calories;
    updatePayload.weight_goal = weightGoal;
  }

  // Allow setting protein, carbs, and fat, even if protein is 0
  if (
    (protein !== undefined || carbs !== undefined || fat !== undefined) &&
    !calories &&
    !weightGoal
  ) {
    // Check if protein, carbs, and fat add up to 100%
    if (
      parseInt(protein || 0) + parseInt(carbs || 0) + parseInt(fat || 0) !==
      100
    ) {
      throw new errorResponse("Macronutrients must add up to 100%", 400);
    }

    // Update payload with protein, carbs, and fat
    if (protein !== undefined) updatePayload.protein = protein;
    if (carbs !== undefined) updatePayload.carbs = carbs;
    if (fat !== undefined) updatePayload.fat = fat;
  }

  if (
    activity_level &&
    !calories &&
    !weightGoal &&
    protein === undefined &&
    carbs === undefined &&
    fat === undefined
  ) {
    updatePayload.activity_level = activity_level;
  }

  if (Object.keys(updatePayload).length === 0) {
    throw new errorResponse("No Fields to Update", 400);
  }

  const updateTarget = await Users.queryUpdateUsers(
    userId,
    updatePayload,
    "userProfile"
  );

  if (updateTarget.affectedRows !== 1) {
    throw new errorResponse("userId Does Not Match!", 400);
  }

  return updateTarget;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @deleteUserAccount
////////////////////////////////////////////////////////////////////////////////////////////////
const deleteUserAccount = async (userId, userData) => {
  const { email, password } = userData;

  if (!userId || !email || !password) {
    throw new errorResponse("Required userId, email, and password!", 400);
  }

  const { match } = await getUserCredentials(email, password);

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
  // updateUserAccountSettings,
  updateUserProfile,
  updateUserTarget,
  deleteUserAccount,
};
