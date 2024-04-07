const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: String,
  age: Number,
  image: String,
  email: String,
  qualification: String,
  bookings: [{ type: Schema.ObjectId, ref: "Booking" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
