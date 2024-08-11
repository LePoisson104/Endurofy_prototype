const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

module.exports = router;
