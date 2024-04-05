const mongoose = require("mongoose");
const { Schema } = mongoose;

const centreSchema = new Schema({
    id:Number,
    name: String,
    email: String,
    p_number: String,
    password: String,
    city: String,
});

const centre = mongoose.model("Centre", centreSchema);

module.exports = { centre };
