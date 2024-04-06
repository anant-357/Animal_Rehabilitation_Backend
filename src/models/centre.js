const mongoose = require("mongoose");
const { Schema } = mongoose;

const centreSchema = new Schema({
  name: String,
  email: String,
  image: String,
  p_number: String,
  password: String,
  city: String,
  bookings: [{ type: Schema.ObjectId, ref: "Booking" }],
  doctors: [{ type: Schema.ObjectId, ref: "Doctor" }],
});

const Centre = mongoose.model("Centre", centreSchema);

module.exports = Centre;
