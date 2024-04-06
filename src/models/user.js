const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have a mail"],
  },
  p_number: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  city: {
    type: String,
    required: [true, "User must have a city"],
  },
  verified: Boolean,
  bookings: [{ type: Schema.ObjectId, ref: "Booking" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
