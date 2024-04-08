const Centre = require("../../models/centre");
const Feedback = require("../../models/feedback");
const User = require("../../models/user");
const Record = require("../../models/bookingRecord");
const Doctor = require("../../models/doctor");
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
        description:centre.description,
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
  const centre_id = req.params.centreId;
  //console.log(centre_id)
  const data1 = await Centre.findOne({ _id: centre_id }, req.body);
  //console.log(data1);
  return res.status(200).json({
    data:data1,
  });
});

exports.getAllCentres = catchAsync(async (_req, res) => {
  console.log("Getting Centres");
  const data = await Centre.find();
  res.status(200).json({
    data,
  });
});

// exports.updateCentre = catchAsync(async (req, res) => {
//   const centre_id = req.params.centreId;
//   console.log(req.body);
//   //console.log(centre_id);
//   const updatedCentre = await Centre.findOneAndReplace(
//     { _id: centre_id },
//     req.body,
//   );
//   updatedCentre.save();
//   res.json({
//     message: "updated",
//     data: updatedCentre,
//   });
// });

exports.updateCentre = catchAsync(async (req, res) => {
  const centre_id = req.params.centreId;
  const updatedFields = req.body;
  const data1 = await Centre.findOne({ _id: centre_id }, req.body);
  if (updatedFields.password!=data1.password) {
    bcrypt.hash(updatedFields.password, 10, async function (err, hash) {
      if (err) {
        // Handle error
        return res.status(500).json({ error: "Error hashing password" });
      }

      updatedFields.password = hash; 

      const updatedCentre = await Centre.findOneAndReplace(
          { _id: centre_id },
          req.body,
      );

      if (!updatedCentre) {
        return res.status(404).json({ error: "Centre not found" });
      }

      res.json({
        message: "Centre updated",
        data: updatedCentre,
      });
    });
  } else {
    const updatedCentre = await Centre.findOneAndReplace(
      { _id: centre_id },
      req.body,
    );

    if (!updatedCentre) {
      return res.status(404).json({ error: "Centre not found" });
    }

    res.json({
      message: "Centre updated",
      data: updatedCentre,
    });
  }
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
  // console.log(centre);
  const feedback_arr = [];
  for(let i = 0 ; i < centre.feedback.length; i++){
    const {info, report, accused, source} = await Feedback.findOne({_id: centre.feedback[i] })
    const {name} = await User.findOne({_id: source });
    console.log(name);
    feedback_arr.push({info, report, accused, source, name});
    // console.log(feedback[i]);
  }
  //console.log(feedback);
  return res.status(200).json({
    data: feedback_arr,
  });
});

exports.recordsOfCentre = catchAsync(async (req, res) => {
  const centreId = req.params.centreId;
  const centre = await Centre.findOne({ _id: centreId });
  // console.log(centre);
  const records_arr = [];
  for(let i = 0 ; i < centre.bookings.length; i++){
    const {centreId, userId, doctorId, address,pickTime,details} = await Record.findOne({_id: centre.bookings[i] })
    const { name: userName } = await User.findOne({_id: userId });
    const { name: doctorName } = await Doctor.findOne({_id: doctorId });
    //console.log(name);
    records_arr.push({centreId, userId, doctorId, address,pickTime,details,userName,doctorName});
    // console.log(feedback[i]);
  }
  //console.log(feedback);
  return res.status(200).json({
    data: records_arr,
  });
});

exports.doctorsOfCentre = catchAsync(async (req, res) => {
  const centreId = req.params.centreId;
  const centre = await Centre.findOne({ _id: centreId });
  // console.log(centre);
  const doctors_arr = [];
  for(let i = 0 ; i < centre.doctors.length; i++){
    const { name,age,email,qualification,image,bookings,centers } = await Doctor.findOne({_id: centre.doctors[i] });
    //console.log(name);
    doctors_arr.push({name,age,email,qualification,image,bookings,centers});
    // console.log(feedback[i]);
  }
  //console.log(feedback);
  return res.status(200).json({
    data: doctors_arr,
  });
});

exports.deleteAllCentres = catchAsync(async (_req, res) => {
  // Delete all feedbacks
  await Centre.deleteMany({});

  // Respond with success message
  res.status(200).json({
    status: 'success',
    message: 'All feedbacks have been successfully deleted.',
  });
});