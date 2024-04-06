const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  info:String,
});

const feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { feedback };
