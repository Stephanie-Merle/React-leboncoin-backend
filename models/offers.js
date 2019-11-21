const mongoose = require("mongoose");

// OFFERS MDL route api/offer/with-count
const Offers = mongoose.model("Offers", {
  count: { type: Number },
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }]
});

module.exports = Offers;
