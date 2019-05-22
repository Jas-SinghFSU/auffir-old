const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
