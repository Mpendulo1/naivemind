const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Required"],
  },
  password: {
    type: String,
    required: [true, "required"],
  },
});

module.exports = mongoose.model("User", userSchema);
