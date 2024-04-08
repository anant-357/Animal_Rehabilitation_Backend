const Doctor = require("../../models/doctor");
const Centre = require("../../models/centre");
const catchAsync = require("../../utils/catchAsync");

exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = req.body;
  const data = await Doctor.create(doctor);
  data.save();
  res.status(200).json({
    data,
  });
});

exports.createDoctors = catchAsync(async (req, res) => {
    const centre_id=req.params.centreId;
    const doctors = req.body;
    for (let i = 0; i < doctors.length; i++) {
      const doctor = doctors[i];
      let doctor_new = new Doctor({
        name: doctor.name,
        age:doctor.age,
        email: doctor.email,
        qualification:doctor.qualification,
        image:doctor.image,
        centers:centre_id,
      });
      doctor_new.save();
      const center = await Centre.findOne({_id: centre_id});
      if(center) {
        //console.log(accused);

        center.doctors.push(doctor_new._id);
        center.save();
      }
    }
    res.send("Done!");
  });


exports.getDoctor = catchAsync(async (req, res) => {
  const doctor_id = req.body._id;
  const data = await Doctor.findOne({ _id: doctor_id }, req.body);
  res.status(200).json({
    data,
  });
});

exports.getAllDoctors = catchAsync(async (_req, res) => {
  const data = await Doctor.find();
  res.status(200).json({
    data,
  });
});

exports.updateDoctor = catchAsync(async (req, res) => {
  const doctor_id = req.body.doctorId;
  console.log(doctor_id);
  const updatedDoctor = await Doctor.findOneAndReplace({ _id: doctor_id }, req.body);
  updatedDoctor.save();
  res.json({
    message: "updated",
    data: updatedDoctor,
  });
});

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

      const updatedCentre = await Centre.findOneAndUpdate(
        { _id: centre_id },
        updatedFields,
        { new: true } 
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
    const updatedCentre = await Centre.findOneAndUpdate(
      { _id: centre_id },
      updatedFields,
      { new: true } 
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

exports.deleteDoctor = catchAsync(async (req, res) => {
    const doctorId = req.params.doctorId; 
    const deletedDoctor = await Doctor.findByIdAndDelete({ _id: doctorId }, req.body);
    if (!deletedDoctor) {
        return res.status(404).json({
        message: "Doctor not found",
        });
    }
    res.json({
        message: "Doctor deleted successfully",
        data: deletedDoctor,
    });
});
  
