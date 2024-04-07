const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  victim: Schema.Types.ObjectId,
  report: Boolean,
  info:String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback ;
