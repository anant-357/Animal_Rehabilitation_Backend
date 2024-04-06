const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: Schema.Types.ObjectId,
  centreId: Schema.Types.ObjectId,
  doctorId: Schema.Types.ObjectId,

  address: String, //of the user
  pickTime: String,
  details: String, //nany medical details related to the pet
});

const booking = mongoose.model("Booking", bookingSchema);

module.exports = { book };
