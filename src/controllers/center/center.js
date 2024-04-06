const Centre = require("../../models/centre");
const catchAsync = require("../../utils/catchAsync");

exports.createCentre = catchAsync(async (req, res, next) => {
  const centre = req.body;
  const data = await Centre.create(centre);
  data.save();
  res.status(200).json({
    data,
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
  const data = await Centre.find();
  res.status(200).json({
    data,
  });
});

exports.updateCentre = catchAsync(async (req, res) => {
  const centre_id = req.body._id;
  console.log(centre_id);
  const updatedCentre = await Centre.findOneAndReplace({ _id: centre_id }, req.body);
  updatedCentre.save();
  res.json({
    message: "updated",
    data: updatedCentre,
  });
});

exports.deleteCentre = catchAsync(async (req, res) => {
    const centreId = req.body._id; 
    const deletedCentre = await Centre.findByIdAndDelete({ _id: centreId }, req.body);
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
  
