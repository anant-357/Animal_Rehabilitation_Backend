const express = require("express");
const router = express.Router();
const {
  createCentres,
  getAllCentres,
  authCentre,
  feedbackOfCentre,
  deleteAllCentres,
  recordsOfCentre,
  doctorsOfCentre,
} = require("../controllers/center/center");

router.route("/createMany").post(createCentres);
router.route("/getFeedback/:centreId").get(feedbackOfCentre);
router.route("/getRecords/:centreId").get(recordsOfCentre);
router.route("/getDoctors/:centreId").get(doctorsOfCentre);
router.route("/getAll").get(getAllCentres);
router.route("/auth").post(authCentre);
router.route("/deleteAll").delete(deleteAllCentres);
module.exports = router;
