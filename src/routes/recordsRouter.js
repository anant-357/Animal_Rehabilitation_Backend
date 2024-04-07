const express = require("express");
const router = express.Router();
const {
  createRecords,
  getAllRecords,
} = require("../controllers/bookingRecord/bookingRecord");

router.route("/createMany").post(createRecords);
router.route("/getAll").get(getAllRecords);
module.exports = router;
