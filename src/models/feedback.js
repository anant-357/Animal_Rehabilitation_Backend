const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  id:Number,//id of the centre whose feedback is being given
  info:String,
});

const feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { feedback };
