const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id:Number,
  name: String,
  email: String,
  p_number: String,
  password: String,
  city: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
