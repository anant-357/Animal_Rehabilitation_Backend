const Centre = require("../../models/centre");
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
        password: hash,
      });
      centre_new.save();
    });
  }
  res.send("Done!");
});

exports.authCentre = catchAsync(async (req, res) => {
  const mail = req.body.email;
  const pass_hash = req.body.password;
  const user = await Centre.findOne({ email: mail });
  if (user) {
    const match = bcrypt.compare(pass_hash, user.password);
    if (match == true) {
      res.status(200).json({
        message: "Log in Successful",
        data: user,
      });
    } else {
      res.status(301).json({
        message: "Passwords do not match",
      });
    }
  }
  res.status(300).json({
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
  console.log(centre);
  const feedback = [];
  for(let i = 0 ; i < centre.feedback.length; i++){
    const user = await User.findOne({_id: centre.feedback[i].source}).name;
    feedback[i] = {...centre.feedback[i], user};
  }
  console.log(feedback);
  return res.status(200).json({
    data: feedback,
  });
});
