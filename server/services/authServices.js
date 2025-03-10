const Users = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const errorResponse = require("../utils/errorResponse");
const userServices = require("./userServices");
const { BMR } = require("../helper/BMR");
const { passwordRegex } = require("../helper/passwordRegex");
const { validDate } = require("../helper/validDate");

////////////////////////////////////////////////////////////////////////////////////////////////
// @signup
////////////////////////////////////////////////////////////////////////////////////////////////
const signUp = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    birthdate,
    height,
    weight,
  } = userData;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !gender ||
    !birthdate ||
    !height ||
    !weight
  ) {
    throw new errorResponse("All Fields Are Required!", 400);
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // length: atleast 8, Captial letter: atleast 1, lowercase letter: atleast 1, digit: atleast 1, special char: atleast 1

  if (validDate(birthdate) === false) {
    throw new errorResponse("Invalid date", 400);
  }

  if (emailPattern.test(email) === false) {
    throw new errorResponse("Invalid email", 400);
  }

  if (passwordRegex(password) === false) {
    throw new errorResponse(
      "Password must be at least 10 characters long.",
      400
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 10 salts
  const userId = uuidv4();
  const basal_metabolic_rate = BMR(gender, birthdate, height, weight);
  const activity_level = "0";
  const calories_target = basal_metabolic_rate;
  const weight_goal = weight;
  const protein = 25;
  const carbs = 45;
  const fat = 30;

  const createUser = await Users.queryCreateNewUser(
    userId,
    email,
    hashedPassword,
    firstName,
    lastName,
    gender,
    birthdate,
    height,
    weight,
    weight_goal,
    calories_target,
    protein,
    carbs,
    fat,
    basal_metabolic_rate,
    activity_level
  );

  if (!createUser) {
    throw new errorResponse(`This email is already in use: ${email}`, 409);
  }

  return createUser;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @login
////////////////////////////////////////////////////////////////////////////////////////////////
const logIn = async (userData, res) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new errorResponse("All Fields Are Required!", 400);
  }

  const { getCredentials, match } = await userServices.getUserCredentials(
    email,
    password
  );

  if (!match) {
    throw new errorResponse("Unauthorized!", 401);
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: getCredentials[0].user_id,
        email: getCredentials[0].email,
        firstName: getCredentials[0].first_name,
        lastName: getCredentials[0].last_name,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Generating JWT Refresh Token
  const refreshToken = jwt.sign(
    { email: getCredentials[0].email, userId: getCredentials[0].user_id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  //   Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: process.env.NODE_ENV === "production", // https
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
  });

  return accessToken;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @refresh
////////////////////////////////////////////////////////////////////////////////////////////////
const refresh = async (cookies) => {
  if (!cookies?.jwt) {
    throw new errorResponse("Unauthorized", 401);
  }

  const refreshToken = cookies.jwt;

  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return reject(new errorResponse("Forbidden", 401));
        }

        try {
          const foundUser = await Users.queryGetUsersCredentials(decoded.email);

          if (!foundUser || foundUser.length === 0) {
            return reject(new errorResponse("Unauthorized", 401));
          }

          if (foundUser[0].user_id !== decoded.userId) {
            return reject(new errorResponse("Unauthorized", 401));
          }

          const accessToken = jwt.sign(
            {
              UserInfo: {
                userId: foundUser[0].user_id,
                email: foundUser[0].email,
                firstName: foundUser[0].first_name,
                lastName: foundUser[0].last_name,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          resolve(accessToken);
        } catch (err) {
          reject(new errorResponse("Server Error", 500)); // Catch any additional errors and reject
        }
      }
    );
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////
// @logout
////////////////////////////////////////////////////////////////////////////////////////////////
const logout = (cookies, res) => {
  if (!cookies?.jwt) {
    throw new errorResponse("No Cookies", 400); // no content
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // https
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site cookie
  });

  res.status(200).json({ message: "Cookie Cleared" });
};

module.exports = { signUp, logIn, refresh, logout };
