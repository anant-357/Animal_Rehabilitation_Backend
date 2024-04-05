const express = require("express");
const { createUser, getUser, updateUser } = require("../controllers/user/user");

const router = express.Router();

router.route("/").get((_req, res) => {
  console.log(" In /api/user/ ");
  res.send(" In /api/user/ ");
});
router.route("/create").post(createUser);
router.route("/get").get(getUser);
router.route("/update").patch(updateUser);

module.exports = router;
