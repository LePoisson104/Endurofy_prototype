const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/:userId", userControllers.getUserInfoById);
router.patch("/update-account/:userId", userControllers.updateUserAccount);
// router.patch(
//   "/update-account-settings/:userId",
//   userControllers.updateUserAccountSettings
// );
router.patch("/update-profile/:userId", userControllers.updateUserProfile);
router.patch("/update-target/:userId", userControllers.updateUserTarget);
router.delete("/delete/:userId", userControllers.deleteUserAccount);

module.exports = router;
