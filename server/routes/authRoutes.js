const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { loginLimiter, signupLimiter } = require("../middleware/requestLimiter");

router.route("/login").post(loginLimiter, authController.login);
router.route("/signup").post(signupLimiter, authController.signup);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

module.exports = router;
