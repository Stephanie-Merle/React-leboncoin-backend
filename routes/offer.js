const express = require("express");
const router = express.Router();

// Add authentication chack with middleware!!!
// Get Offer mdl
const Offer = require("../models/offer");

// What we get from create post request : title, description, price, file

// CREATE ***********
router.post("/api/offer/publish", async (req, res) => {
  try {
    const newPost = await new Offer({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      file: req.files //  { file1: ..., file2: ... }
      //upload to cloudinary and get link
    });
    await newOffer.save();
    return res.json({ message: "Offer uploaded" });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});
// READ   ***********

// UPDATE ***********

// DELETE ***********

module.exports = router;
