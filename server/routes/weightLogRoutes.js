const express = require("express");
const router = express.Router();
const weightLogControllers = require("../controllers/weightLogControllers");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.get(
  "/get-all-weight-logs/:userId",
  weightLogControllers.getAllWeightLogs
);
router.get(
  "/get-weight-logs-by-dates/:userId",
  weightLogControllers.getWeightLogsByDates
);

router.post("/add-weight-log/:userId", weightLogControllers.addWeightLog);

router.patch(
  "/update-weight-log/:weightLogId",
  weightLogControllers.updateWeightLog
);

router.delete(
  "/delete-weight-log/:weightLogId",
  weightLogControllers.deleteWeightLog
);

module.exports = router;
