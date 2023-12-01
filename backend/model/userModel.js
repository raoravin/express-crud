const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must br 25 char long"],
  },
  email: {
    type: String,
    require: [true, "Email id Required"],
    unique: true,
  },
});

module.exports = mongoose.model("user", userSchema);
