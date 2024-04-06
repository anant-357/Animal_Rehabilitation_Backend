const express = require("express");
const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailVerification = require("../../utils/mailVerification");
const verificationEmailTemplate = require("../../utils/mailVerificationTemplate");
const router = express.Router();

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, telephone, city, password } = req.body;

  if (!name) {
    return res.json({ error: "Name is required" });
  }
  let existingUserCheck = await User.find({ email });
  if (existingUserCheck.length > 0) {
    return res.json({ error: "Email already in use" });
  }
  bcrypt.hash(password, 10, async function (err, hash) {
    let user = new User({
      name: name,
      email: email,
      p_number: telephone,
      city: city,
      password: hash,
      verified: false,
    });

    let token = jwt.sign({ email }, process.env.JWTSECRET, { expiresIn: "1h" });
    emailVerification(
      user.email,
      "Verification Email",
      verificationEmailTemplate(token),
    );
    user.save();
    res.send(user);
  });
});

router.post("/emailVerification", async function (req, res) {
  const { authorization } = req.headers;
  const decoded = jwt.verify(authorization, process.env.JWTSECRET);
  console.log(decoded.email);
  let updateUser = await User.findOneAndUpdate(
    { email: decoded.email },
    { verified: true },
    { new: true },
  );
  res.json(updateUser);
});

exports.getUser = catchAsync(async (req, res) => {
  const user_id = req.body._id;
  const data = await User.findOne({ _id: user_id }, req.body);
  res.status(200).json({
    data,
  });
});

exports.getAllUsers = catchAsync(async (_req, res) => {
  const data = await User.find();
  res.status(200).json({
    data,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user_id = req.body._id;
  console.log(user_id);
  const updatedUser = await User.findOneAndReplace({ _id: user_id }, req.body);
  updatedUser.save();
  res.json({
    message: "updated",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const userId = req.body._id;
  const deletedUser = await User.findByIdAndDelete({ _id: userId }, req.body);
  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json({
    message: "User deleted successfully",
    data: deletedUser,
  });
});
