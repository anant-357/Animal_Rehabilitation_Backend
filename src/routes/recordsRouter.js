const express = require("express");
const router = express.Router();
const {
  createRecords,
  getAllRecords,
  deleteAllRecords,
} = require("../controllers/bookingRecord/bookingRecord");

router.route("/createMany").post(createRecords);
router.route("/getAll").get(getAllRecords);
router.route("/deleteAll").delete(deleteAllRecords);
module.exports = router;
