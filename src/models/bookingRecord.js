const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: Schema.Types.ObjectId,
  centreId: Schema.Types.ObjectId,
  doctorId: Schema.Types.ObjectId,

  address: String, //of the user
  pickTime: String,
  details: String, //any medical details related to the pet
});

const Record = mongoose.model("Booking", bookingSchema);

module.exports = Record;
