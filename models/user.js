const mongoose = require("mongoose");

// mdl USER schema
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
    phone: { type: String }
  },
  token: { type: String },
  salt: { type: String },
  hash: { type: String }
});
// we could add offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }]
// and use length of the array to get how many offers the user has
// could also add a 'last connection' field
module.exports = User;
