const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  authUser,
} = require("../controllers/user/user");

const router = express.Router();

router.route("/").get((_req, res) => {
  console.log(" In /api/user/ ");
  res.send(" In /api/user/ ");
});
router.route("/create").post(createUser);
router.route("/get").get(getUser);
router.route("/getAll").get(getAllUsers);
router.route("/update").patch(updateUser);
router.route("/delete").delete(deleteUser);
router.route("/auth").post(authUser);

module.exports = router;
