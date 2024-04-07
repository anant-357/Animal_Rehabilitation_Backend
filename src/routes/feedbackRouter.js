const express = require("express");
const router = express.Router();
const {
  createFeedbacks,
  getAllFeedbacks,
  deleteAllFeedbacks,
} = require("../controllers/feedback/feedback");

router.route("/createMany").post(createFeedbacks);
router.route("/getAll").get(getAllFeedbacks);
router.route("/deleteAll").delete(deleteAllFeedbacks);
module.exports = router;
