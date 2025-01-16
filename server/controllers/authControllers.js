const authServices = require("../services/authServices");
const controllerErrorResponse = require("../utils/controllerErrorResponse");

// @desc Signup
// @route POST/auth
// @access Public
const signup = async (req, res) => {
  const userData = ({
    firstName,
    lastName,
    email,
    password,
    gender,
    birthdate,
    height,
    weight,
  } = req.body);

  try {
    await authServices.signUp(userData);
    return res.status(200).json({ message: "User Created Successfully!" });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

// @desc Login
// @route POST/auth
// @access Public
const login = async (req, res) => {
  const userData = ({ email, password } = req.body);

  try {
    const accessToken = await authServices.logIn(userData, res);
    // Send accessToken containing user information
    res.status(200).json({ message: "Success!", accessToken });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

// @desc Refresh
// @route GET/auth/refresh
// @acces Public - because access token has expired
const refresh = async (req, res) => {
  const cookies = req.cookies;
  try {
    const accessToken = await authServices.refresh(cookies);
    return res.status(200).json({ accessToken });
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

// @desc Logout
// @route POST/auth/refresh
// @acces Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  try {
    authServices.logout(cookies, res);
  } catch (err) {
    controllerErrorResponse(res, err);
  }
};

module.exports = {
  signup,
  login,
  refresh,
  logout,
};
