const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  const data = await User.create(user);
  data.save();
  res.status(200).json({
    data,
  });
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
