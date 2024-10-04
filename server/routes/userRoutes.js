const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/:userId").get(userController.getUserInfoById);
router.patch("/update-account/:userId", userController.updateUserAccount);
// router.patch(
//   "/update-account-settings/:userId",
//   userController.updateUserAccountSettings
// );
router.patch("/update-profile/:userId", userController.updateUserProfile);
router.patch("/update-target/:userId", userController.updateUserTarget);
router.delete("/delete/:userId", userController.deleteUserAccount);

module.exports = router;
