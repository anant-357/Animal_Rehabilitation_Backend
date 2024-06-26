const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  accused: { type: Schema.Types.ObjectId, ref: "Centre" },
  source: { type: Schema.Types.ObjectId, ref: "User" },
  report: Boolean,
  info: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback ;
