const Record = require("../../models/bookingRecord");
const Centre = require("../../models/centre");
const User = require("../../models/user");
const Doctor = require("../../models/doctor");
const catchAsync = require("../../utils/catchAsync");
const stripe = require("stripe")("sk_test_51P2WnpSGeskEFHWuwuOB50NMEBr86sDGXjljlzr5G3Crsz6HIxx1X4nQQvafuA9IgZwgldD5xtnD6f5r1hN3owSo00UsTZcYfD");

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
        userId:record.userId,
        centreId:record.centreId,
        doctorId:record.doctorId,
        address:record.address,
        pickTime:record.pickTime,
        details:record.details,
      });
      record_new.save();

      const cent = await Centre.findOne({_id: record.centreId});
      if(cent) {
          //console.log(accused);

          cent.bookings.push(record_new._id);
          cent.save();
      }
      const user = await User.findOne({_id: record.userId});
      if(user) {
        // console.log(source);

        user.bookings.push(record_new._id);
        user.save();
      }

      const doctor = await Doctor.findOne({_id: record.doctorId});
      if(doctor) {
        // console.log(source);

        doctor.bookings.push(record_new._id);
        doctor.save();
      }
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

exports.deleteAllRecords = catchAsync(async (_req, res) => {
  // Delete all feedbacks
  await Record.deleteMany({});

  // Respond with success message
  res.status(200).json({
    status: 'success',
    message: 'All records have been successfully deleted.',
  });
});


exports.paymentRecord = catchAsync(async(req,res)=>{
  const {payload} = req.body;

  // const customer = await stripe.customers.create({
  //     name: 'Jenny Rosen',
  //     address: {
  //       line1: '510 Townsend St',
  //       postal_code: '98140',
  //       city: 'San Francisco',
  //       state: 'CA',
  //       country: 'US',
  //     },
  // });
  
  const lineItems = [{
      price_data:{
          currency:"inr",
          product_data:{
              name:payload.address,
          },
          unit_amount:payload.price * 100,
      },
      quantity:1
  }];

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      // customer,
      mode:"payment",
      success_url:"http://localhost:5173/updateuser",
      cancel_url:"http://localhost:5173/aman",
  });

  res.json({id:session.id})

});


