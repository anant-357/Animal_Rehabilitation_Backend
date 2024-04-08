const express = require("express");
const router = express.Router();
const {
  createDoctors,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/center/doctor");

router.route("/createMany/:centreId").post(createDoctors);
router.route("/getAll").get(getAllDoctors);
router.route("/update/:doctorId").patch(updateDoctor);
router.route("/delete/:doctorId").delete(deleteDoctor);
module.exports = router;
