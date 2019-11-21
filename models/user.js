const mongoose = require("mongoose");

// USER MDL
const User = mongoose.model("User", {
  account: {
    username: { type: String, minlength: 3, maxlength: 20, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 6,
      maxlength: 30,
      required: true
    },
    phone: { type: Number }
  },
  token: { type: String },
  salt: { type: String },
  hash: { type: String }
});

module.exports = User;
