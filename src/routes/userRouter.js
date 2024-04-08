const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  authUser,
  createUsers,
  createBooking,
  deleteAllUsers,
  updateUser,
} = require("../controllers/user/user");

const router = express.Router();

router.route("/").get((_req, res) => {
  console.log(" In /api/user/ ");
  res.send(" In /api/user/ ");
});
router.route("/create").post(createUser);
router.route("/get").get(getUser);
router.route("/getAll").get(getAllUsers);
router.route("/delete").delete(deleteUser);
router.route("/auth").post(authUser);
router.route("/createMany").post(createUsers);
router.route("/createBooking").post(createBooking);
router.route("/deleteAll").delete(deleteAllUsers);
router.route("/update/:userId").patch(updateUser);

module.exports = router;
