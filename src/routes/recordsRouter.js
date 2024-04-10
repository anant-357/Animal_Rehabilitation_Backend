const express = require("express");
const router = express.Router();
const {
  createRecords,
  getAllRecords,
  deleteAllRecords,
  paymentRecord,
  deleteRecord,
} = require("../controllers/bookingRecord/bookingRecord");

router.route("/createMany").post(createRecords);
router.route("/getAll").get(getAllRecords);
router.route("/deleteAll").delete(deleteAllRecords);
router.route("/payment").post(paymentRecord);
router.route("/delete/:recordId").delete(deleteRecord);
module.exports = router;
