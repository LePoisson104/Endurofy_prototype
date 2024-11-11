const express = require("express");
const router = express.Router();
const foodDiaryControllers = require("../controllers/foodDiaryControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

// food
router.get("/search-food", foodDiaryControllers.searchFood);
router.get("/get-food-by-date/:userId", foodDiaryControllers.getAllFood);
router.post("/add-food/:userId", foodDiaryControllers.addFood);
router.patch("/update-food-by-id/:foodId", foodDiaryControllers.updateFood);
router.delete("/delete-food-by-id/:foodId", foodDiaryControllers.deleteFood);

module.exports = router;
