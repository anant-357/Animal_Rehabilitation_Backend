const express = require("express");
const User = require("../../models/user");
const Centre = require("../../models/centre");
const Doctor = require("../../models/doctor");
const Booking = require("../../models/bookingRecord");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, p_number, city, password } = req.body;
  console.log(req.body);

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
      p_number: p_number,
      city: city,
      password: hash,
      bookings: [],
      complaints: [],
    });

    user.save();
    res.send(user);
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user_id = req.body._id;
  const data = await User.findOne({ _id: user_id }, req.body);
  res.status(200).json({
    data,
  });
});

exports.createUsers = catchAsync(async (req, res) => {
  const users = req.body;
  for (let i = 0; i < users.length; i++) {
    const { name, email, p_number, city, password } = users[i];
    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new User({
        name: name,
        email: email,
        p_number: p_number,
        city: city,
        password: hash,
      });
      user.save();
    });
  }
  res.send("Done!");
});

exports.authUser = catchAsync(async (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;
  const user = await User.findOne({ email: mail });
  if (user) {
    const match = await bcrypt.compare(pass, user.password);
    if (match == true) {
      return res.status(200).json({
        message: "Log in Successful",
        data: user,
      });
    } else {
      return res.status(301).json({
        message: "Passwords do not match",
      });
    }
  }
  return res.status(300).json({
    message: "No user assosciated with this email",
  });
});

exports.getAllUsers = catchAsync(async (_req, res) => {
  const data = await User.find();
  res.status(200).json({
    data,
  });
});

// exports.updateUser = catchAsync(async (req, res) => {
//   const user_id = req.body._id;
//   const updatedUser = await User.findOneAndReplace({ _id: user_id }, req.body);
//   updatedUser.save();
//   res.json({
//     message: "updated",
//     data: updatedUser,
//   });
// });

exports.updateUser = catchAsync(async (req, res) => {
  const user_id = req.params.userId;
  const updatedFields = req.body;
  console.log(updatedFields);
  const data1 = await User.findOne({ _id: user_id }, req.body);
  console.log(data1)
  if (updatedFields.password!=data1.password) {
    bcrypt.hash(updatedFields.password, 10, async function (err, hash) {
      if (err) {
        // Handle error
        return res.status(500).json({ error: "Error hashing password" });
      }

      updatedFields.password = hash; 

      const updatedUser = await User.findOneAndReplace({ _id: user_id }, req.body);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        message: "User updated",
        data: updatedUser,
      });
    });
  } else {
    const updatedUser = await User.findOneAndReplace({ _id: user_id }, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User updated",
      data: updatedUser,
    });
  }
});


exports.deleteUser = catchAsync(async (req, res) => {
  const userId = req.body._id;
  const deletedUser = await User.findByIdAndDelete({ _id: userId }, req.body);
  for (let i = 0; i < deletedUser.bookings.length; i++) {
    const bookingId = deletedUser.bookings[i];

    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      continue;
    }

    const { centreId, doctorId } = booking;

    const centre = await Centre.findOne({ _id: centreId });
    if (centre) {
      centre.bookings = centre.bookings.filter(
        (bId) => bId.toString() !== bookingId.toString(),
      );
      await centre.save();
    }

    const doctor = await Doctor.findOne({ _id: doctorId });
    if (doctor) {
      doctor.bookings = doctor.bookings.filter(
        (bId) => bId.toString() !== bookingId.toString(),
      );
      await doctor.save();
    }
  }
  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.json({
    message: "User deleted successfully",
    data: deletedUser,
  });
});

exports.createBooking = catchAsync(async (req, res) => {
  const { userId, centreId, doctorId, address, pickTime, details } = req.body;
  const user = await User.findOne({ _id: userId });
  const centre = await Centre.findOne({ _id: centreId });
  const doctor = await Doctor.findOne({ _id: doctorId });
  if (user && centre) {
    const booking = new Booking({
      userId,
      centreId,
      doctorId,
      address,
      pickTime,
      details,
      status: "in-process",
    });
    booking.save();
    user.bookings.push(booking._id);
    user.save();
    centre.bookings.push(booking._id);
    centre.save();
    doctor.bookings.push(booking._id);
    doctor.save();
    return res.status(200).json({
      message: "Booking Succesful",
      data: booking,
    });
  }
});

exports.deleteAllUsers = catchAsync(async (_req, res) => {
  // Delete all feedbacks
  await User.deleteMany({});

  // Respond with success message
  res.status(200).json({
    status: "success",
    message: "All feedbacks have been successfully deleted.",
  });
});

exports.recordsOfUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  const records_arr = [];
  for (let i = 0; i < user.bookings.length; i++) {
    const { centreId, userId, doctorId, address, pickTime, details, status } =
      await Booking.findOne({ _id: user.bookings[i] });
    const { name: userName } = await User.findOne({ _id: userId });
    const doctor = await Doctor.findOne({ _id: doctorId });
    const { name: centreName } = await Centre.findOne({ _id: centreId });
    records_arr.push({
      centreId,
      userId,
      doctorId,
      address,
      pickTime,
      details,
      userName,
      centreName,
      status,
    });
  }
  console.log(records_arr);
  return res.status(200).json({
    data: records_arr,
  });
});

