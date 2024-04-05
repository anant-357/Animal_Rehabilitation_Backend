const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
    id:Number,//of centre being booked
    address:String,//of the user
    pickTime:String,
    details:String,//nany medical details related to the pet
});

const book = mongoose.model("Book", bookSchema);

module.exports = { book };
