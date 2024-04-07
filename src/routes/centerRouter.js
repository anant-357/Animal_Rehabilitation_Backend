const express = require("express");
const router = express.Router();
const {
  createCentres,
  getAllCentres,
  authCentre,
  feedbackOfCentre,
  deleteAllCentres,
  getCities,
} = require("../controllers/center/center");

router.route("/createMany").post(createCentres);
router.route("/getFeedback/:centreId").get(feedbackOfCentre);
router.route("/getCities").get(getCities);
router.route("/getAll").get(getAllCentres);
router.route("/auth").post(authCentre);
router.route("/deleteAll").delete(deleteAllCentres);
module.exports = router;
