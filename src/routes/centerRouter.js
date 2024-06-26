const express = require("express");
const router = express.Router();
const {
  createCentres,
  getAllCentres,
  authCentre,
  feedbackOfCentre,
  deleteAllCentres,
  getCities,
  recordsOfCentre,
  doctorsOfCentre,
  updateCentre,
  getCentre,
} = require("../controllers/center/center");

router.route("/createMany").post(createCentres);
router.route("/getFeedback/:centreId").get(feedbackOfCentre);
router.route("/getDoctors/:centreId").get(doctorsOfCentre);
router.route("/getCities").get(getCities);
router.route("/getRecords/:centreId").get(recordsOfCentre);
router.route("/update/:centreId").patch(updateCentre);
router.route("/getCentre/:centreId").get(getCentre);
router.route("/getAll").get(getAllCentres);
router.route("/auth").post(authCentre);
router.route("/deleteAll").delete(deleteAllCentres);
module.exports = router;
