const express = require("express");
const router = express.Router();
const {
  createDoctors,
  getAllDoctors,
} = require("../controllers/center/doctor");

router.route("/createMany").post(createDoctors);
router.route("/getAll").get(getAllDoctors);
module.exports = router;
