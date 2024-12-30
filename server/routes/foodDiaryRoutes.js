const express = require("express");
const router = express.Router();
const foodDiaryControllers = require("../controllers/foodDiaryControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

// food
router.get("/search-food", foodDiaryControllers.searchFood);
router.get("/get-food-by-date/:userId", foodDiaryControllers.getAllFood);
router.get("/get-log-dates/:userId", foodDiaryControllers.getLogDates);
router.get("/get-favorite-food/:userId", foodDiaryControllers.getFavoriteFood);
router.get(
  "/get-is-favorite-food/:userId",
  foodDiaryControllers.getIsFavoriteFood
);

router.post("/add-food/:userId", foodDiaryControllers.addFood);
router.post("/add-favorite-food/:userId", foodDiaryControllers.addFavoriteFood);

router.patch("/update-food-by-id/:foodId", foodDiaryControllers.updateFood);

router.delete("/delete-food-by-id/:foodId", foodDiaryControllers.deleteFood);
router.delete(
  "/delete-favorite-food-by-id/:favFoodId",
  foodDiaryControllers.deleteFavoriteFood
);

module.exports = router;
