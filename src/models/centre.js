const mongoose = require("mongoose");
const { Schema } = mongoose;

const centreSchema = new Schema({
  name: String,
  email: String,
  p_number: String,
  password: String,
  city: String,
  bookings: [{ type: Schema.ObjectId, ref: "Booking" }],
});

const centre = mongoose.model("Centre", centreSchema);

module.exports = { centre };
