const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
    id: Number, 
    name: String,
    age: Number,
    image: String, 
    email: String,
    qualification: String,
});

const doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { doctor };
