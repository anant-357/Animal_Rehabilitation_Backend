const mongoose = require("mongoose");

function db() {
  mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log("Database Connected");
  });
}

module.exports = db;
