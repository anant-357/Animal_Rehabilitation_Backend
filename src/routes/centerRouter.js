const express = require("express");
const router = express.Router();
const {
  createCentres,
  getAllCentres,
  authCentre,
} = require("../controllers/center/center");

router.route("/createMany").post(createCentres);
router.route("/getAll").get(getAllCentres);
router.route("/auth").post(authCentre);
module.exports = router;
