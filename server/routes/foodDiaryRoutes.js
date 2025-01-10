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
router.get("/get-custom-food/:userId", foodDiaryControllers.getCustomFood);
router.get(
  "/get-custom-food-by-id/:foodId",
  foodDiaryControllers.getCustomFoodById
);

router.post("/add-food/:userId", foodDiaryControllers.addFood);
router.post("/add-favorite-food/:userId", foodDiaryControllers.addFavoriteFood);
router.post("/add-custom-food/:userId", foodDiaryControllers.addCustomFood);

router.patch("/update-food-by-id/:foodId", foodDiaryControllers.updateFood);
router.patch(
  "/update-custom-food-by-id/:customFoodId",
  foodDiaryControllers.updateCustomFood
);

router.delete("/delete-food-by-id/:foodId", foodDiaryControllers.deleteFood);
router.delete(
  "/delete-favorite-food-by-id/:favFoodId",
  foodDiaryControllers.deleteFavoriteFood
);
router.delete(
  "/delete-custom-food-by-id/:customFoodId",
  foodDiaryControllers.deleteCustomFood
);

module.exports = router;
