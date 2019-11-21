const mongoose = require("mongoose");

// OFFER MDL route: api/offer/
const Offer = mongoose.model("Offer", {
  pictures: [],
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  created: { type: Date, default: Date.now },
  creator: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    account: {
      username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  }
});

module.exports = Offer;
