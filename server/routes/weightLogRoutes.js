const express = require("express");
const router = express.Router();
const weightLogControllers = require("../controllers/weightLogControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/get-weight-logs/:userId", weightLogControllers.getWeightLogs);
router.post("/add-weight-log/:userId", weightLogControllers.addWeightLog);
router.patch(
  "/update-weight-log/:weightId",
  weightLogControllers.updateWeightLog
);
router.delete(
  "/delete-weight-log/:weightId",
  weightLogControllers.deleteWeightLog
);

module.exports = router;
