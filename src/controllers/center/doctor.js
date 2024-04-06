const Doctor = require("../../models/doctor");
const catchAsync = require("../../utils/catchAsync");

exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = req.body;
  const data = await Doctor.create(doctor);
  data.save();
  res.status(200).json({
    data,
  });
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
  const doctor_id = req.body._id;
  console.log(doctor_id);
  const updatedDoctor = await Doctor.findOneAndReplace({ _id: doctor_id }, req.body);
  updatedDoctor.save();
  res.json({
    message: "updated",
    data: updatedDoctor,
  });
});

exports.deleteDoctor = catchAsync(async (req, res) => {
    const doctorId = req.body._id; 
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
  
