const Centre = require("../../models/centre");
const Feedback = require("../../models/feedback");
const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.createCentre = catchAsync(async (req, res, next) => {
  const centre = req.body;
  const data = await Centre.create(centre);
  data.save();
  res.status(200).json({
    data,
  });
});

exports.createCentres = catchAsync(async (req, res) => {
  const centres = req.body;
  for (let i = 0; i < centres.length; i++) {
    const centre = centres[i];
    bcrypt.hash(centre.password, 10, async function (err, hash) {
      let centre_new = new Centre({
        name: centre.name,
        email: centre.email,
        p_number: centre.p_number,
        city: centre.city,
        image: centre.image,
        description: centre.description,
        bookings: [],
        feedback: [],
        doctors: [],
        password: hash,
      });
      centre_new.save();
    });
  }
  res.send("Done!");
});

exports.getCities = catchAsync(async (_req, res) => {
  const cities = new Set();
  const centres = await Centre.find();
  for (let i = 0; i < centres.length; i++) {
    cities.add(centres[i].city);
    console.log(centres[i].city);
  }
  return res.status(200).json({
    data: [...cities],
  });
});

exports.authCentre = catchAsync(async (req, res) => {
  const mail = req.body.email;
  const pass_hash = req.body.password;
  const user = await Centre.findOne({ email: mail });
  if (user) {
    const match = await bcrypt.compare(pass_hash, user.password);
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
    message: "No centre assosciated with this email",
  });
});

exports.getCentre = catchAsync(async (req, res) => {
  const centre_id = req.body._id;
  const data = await Centre.findOne({ _id: centre_id }, req.body);
  res.status(200).json({
    data,
  });
});

exports.getAllCentres = catchAsync(async (_req, res) => {
  console.log("Getting Centres");
  const data = await Centre.find();
  res.status(200).json({
    data,
  });
});

exports.updateCentre = catchAsync(async (req, res) => {
  const centre_id = req.body._id;
  console.log(centre_id);
  const updatedCentre = await Centre.findOneAndReplace(
    { _id: centre_id },
    req.body,
  );
  updatedCentre.save();
  res.json({
    message: "updated",
    data: updatedCentre,
  });
});

exports.deleteCentre = catchAsync(async (req, res) => {
  const centreId = req.body._id;
  const deletedCentre = await Centre.findByIdAndDelete(
    { _id: centreId },
    req.body,
  );
  if (!deletedCentre) {
    return res.status(404).json({
      message: "Centre not found",
    });
  }
  res.json({
    message: "Centre deleted successfully",
    data: deletedCentre,
  });
});

exports.feedbackOfCentre = catchAsync(async (req, res) => {
  const centreId = req.params.centreId;
  const centre = await Centre.findOne({ _id: centreId });
  //console.log(centre);
  const feedback_arr = [];
  for (let i = 0; i < centre.feedback.length; i++) {
    const { info, report, accused, source } = await Feedback.findOne({
      _id: centre.feedback[i],
    });
    const { name } = await User.findOne({ _id: source });
    console.log(name);
    feedback_arr.push({ info, report, accused, source, name });
    // console.log(feedback[i]);
  }
  //console.log(feedback);
  return res.status(200).json({
    data: feedback_arr,
  });
});

exports.deleteAllCentres = catchAsync(async (_req, res) => {
  // Delete all feedbacks
  await Centre.deleteMany({});

  // Respond with success message
  res.status(200).json({
    status: "success",
    message: "All feedbacks have been successfully deleted.",
  });
});
