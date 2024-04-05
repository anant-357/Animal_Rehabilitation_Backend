const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");

exports.createMerchant = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const data = await Merchant.create({ user });
  res.status(200).json({
    data,
  });
});

exports.getMerchants = catchAsync(async (req, res) => {
  const data = await Merchant.find().populate({
    path: "user",
    select: "name email",
  });
  res.status(200).json({
    data,
  });
});

exports.merchantStatus = catchAsync(async (req, res) => {
  const { status, user } = req.body;
  const updatedMerchantStatus = await Merchant.findOneAndUpdate(
    { user: user },
    { status: status },
    {
      new: true,
    },
  );

  res.json({
    message: "updated",
    data: updatedMerchantStatus,
  });
});
