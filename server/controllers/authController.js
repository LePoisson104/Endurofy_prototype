const Users = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// @desc Signup
// @route POST/auth
// @access Public
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const createUser = Users.queryCreateNewUser(
    userId,
    email,
    hashedPassword,
    name
  );
  createUser
    .then((status) => {
      if (!status) {
        return res.status(400).json({ message: "Duplicate Email" });
      }
      if (status.affectedRows === 1) {
        return res.status(200).json({ message: "User Created Successfully!" });
      }
    })
    .catch((err) => console.error(err));
};

// @desc Login
// @route POST/auth
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  try {
    const foundUser = await Users.queryGetUsersCredentials(email);

    if (foundUser.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, foundUser[0].hashed_password);

    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Generating JWT Access Token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser[0].email,
          name: foundUser[0].name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generating JWT Refresh Token
    const refreshToken = jwt.sign(
      { email: foundUser[0].email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: "None", // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
    });

    // Send accessToken containing user information
    res.status(200).json({ message: "Success!", accessToken });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Refresh
// @route GET/auth/refresh
// @acces Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      try {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const foundUser = await Users.queryGetUsersCredentials(decoded.email);

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
            UserInfo: {
              email: foundUser[0].email,
              name: foundUser[0].name,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      } catch (err) {
        console.error(err);
      }
    }
  );
};

// @desc Logout
// @route POST/auth/refresh
// @acces Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //no content
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie Cleared" });
};

module.exports = {
  signup,
  login,
  refresh,
  logout,
};
