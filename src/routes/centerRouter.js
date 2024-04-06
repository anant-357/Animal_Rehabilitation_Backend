const express = require("express");
const router = express.Router();
const {
  createCentres,
  getAllCentres,
} = require("../controllers/center/center");

router.route("/createMany").post(createCentres);
router.route("/getAll").get(getAllCentres);
module.exports = router;
