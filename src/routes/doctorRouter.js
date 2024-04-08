const express = require("express");
const router = express.Router();
const {
  createDoctors,
  getAllDoctors,
  updateDoctor,
} = require("../controllers/center/doctor");

router.route("/createMany").post(createDoctors);
router.route("/getAll").get(getAllDoctors);
router.route("/update/:doctorId").patch(updateDoctor);
module.exports = router;
