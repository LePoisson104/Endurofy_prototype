const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const { loginLimiter, signupLimiter } = require("../middleware/requestLimiter");

router.route("/login").post(loginLimiter, authControllers.login);
router.route("/signup").post(signupLimiter, authControllers.signup);
router.route("/refresh").get(authControllers.refresh);
router.route("/logout").post(authControllers.logout);

module.exports = router;
