const Feedback = require("../../models/feedback");
const catchAsync = require("../../utils/catchAsync");

exports.createFeedback = catchAsync(async (req, res, next) => {
  const feedback = req.body;
  const data = await Feedback.create(feedback);
  data.save();
  res.status(200).json({
    data,
  });
});

exports.getFeedback = catchAsync(async (req, res) => {
  const centre_id = req.body._id;
  const data = await Feedback.find({_id: centre_id });
  res.status(200).json({
    data,
  });
});

exports.getAllFeedbacks = catchAsync(async (_req, res) => {
  const data = await Feedback.find();
  res.status(200).json({
    data,
  });
});


  
