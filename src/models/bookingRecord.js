const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  centreId: { type: Schema.Types.ObjectId, ref: "Centre" },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },

  address: String, //of the user
  pickTime: String,
  details: String, //any medical details related to the pet
});

const Record = mongoose.model("Booking", bookingSchema);

module.exports = Record;
