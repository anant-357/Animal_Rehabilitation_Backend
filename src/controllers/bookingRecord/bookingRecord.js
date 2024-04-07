const Record = require("../../models/bookingRecord");
const catchAsync = require("../../utils/catchAsync");

exports.createRecord = catchAsync(async (req, res, next) => {
  const record = req.body;
  const data = await Record.create(record);
  data.save();
  res.status(200).json({
    data,
  });
});

exports.createRecords = catchAsync(async (req, res) => {
    const records = req.body;
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      let record_new = new Record({
        address:record.address,
        pickTime:record.pickTime,
        details:record.details,
      });
      record_new.save();
    }
    res.send("Done!");
  });

exports.getRecord = catchAsync(async (req, res) => {
  const record_id = req.body._id;
  const data = await Record.findOne({ _id: record_id }, req.body);
  res.status(200).json({
    data,
  });
});

exports.getAllRecords = catchAsync(async (_req, res) => {
  const data = await Record.find();
  res.status(200).json({
    data,
  });
});

exports.updateRecord = catchAsync(async (req, res) => {
  const record_id = req.body._id;
  console.log(record_id);
  const updatedRecord = await Record.findOneAndReplace({ _id: record_id }, req.body);
  updatedRecord.save();
  res.json({
    message: "updated",
    data: updatedRecord,
  });
});

exports.deleteRecord = catchAsync(async (req, res) => {
  const recordId = req.body._id; 
  const deletedRecord = await Record.findByIdAndDelete({ _id: recordId }, req.body);
  if (!deletedRecord) {
    return res.status(404).json({
      message: "Record not found",
    });
  }
  res.json({
    message: "Record deleted successfully",
    data: deletedRecord,
  });
});
