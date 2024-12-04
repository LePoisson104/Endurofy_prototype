const express = require("express");
const router = express.Router();
const waterLogControllers = require("../controllers/waterLogControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get(
  "/get-water-intake-by-date/:userId",
  waterLogControllers.getAllWater
);
router.post("/add-water/:userId", waterLogControllers.addWater);
router.patch(
  "/update-water-intake/:waterId",
  waterLogControllers.updateWaterIntake
);
router.delete();

module.exports = router;
