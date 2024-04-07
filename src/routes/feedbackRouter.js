const express = require("express");
const router = express.Router();
const {
  createFeedbacks,
  getAllFeedbacks,
} = require("../controllers/feedback/feedback");

router.route("/createMany").post(createFeedbacks);
router.route("/getAll").get(getAllFeedbacks);
module.exports = router;
