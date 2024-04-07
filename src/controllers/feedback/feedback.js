const Centre = require("../../models/centre");
const User = require("../../models/user");
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

exports.createFeedbacks = catchAsync(async (req, res) => {
    const feedbacks = req.body;
    for (let i = 0; i < feedbacks.length; i++) {
        const feedback = feedbacks[i];
        // console.log(feedback);
        let feedback_new = new Feedback({
            accused:feedback.accused,
            source:feedback.source,
            report:feedback.report,
            info:feedback.info
        });
        feedback_new.save();
        // console.log(feedback_new);

        const accused = await Centre.findOne({_id: feedback.accused});
        if(accused) {
          console.log(accused);

          accused.feedback.push(feedback_new._id);
          accused.save();
        }
        const source = await User.findOne({_id: feedback.accused});
        if(source) {
        // console.log(source);

        source.complaints.push(feedback_new._id);
        source.save();
        }
    }
    res.send("Done!");
});

exports.getFeedback = catchAsync(async (req, res) => {
  const centre_id = req.body._id;
  const data = await Feedback.find({_id: centre_id });
  res.status(200).json({
    data,
  });
});

exports.getAllFeedbacks = catchAsync(async (_req, res) => {
  console.log("Getting Feedbacks");
  const data = await Feedback.find();
  res.status(200).json({
    data,
  });
});

exports.deleteAllFeedbacks = catchAsync(async (_req, res) => {
  // Delete all feedbacks
  await Feedback.deleteMany({});

  // Respond with success message
  res.status(200).json({
    status: 'success',
    message: 'All feedbacks have been successfully deleted.',
  });
});