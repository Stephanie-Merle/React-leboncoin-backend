const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwzcbxy3u",
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.API_SECRET
});
// Add authentication check with middleware!!!
// Get Offer mdl
const Offer = require("../models/offer");
const User = require("../models/user");

// What we get from create post request : title, description, price, file

// CREATE ***********
router.post("/api/offer/publish", async (req, res) => {
  const auth = req.headers.authorization; // auth = Bearer token
  if (!auth) {
    res.status(401).json({
      error: "Missing Authorization Header"
    });
    return;
  }
  // check if the auth is Bearer
  if (/^Bearer/.test(auth)) {
    console.log("Bearer true");
  }
  // check if token is valid
  const token = auth.substring(7);
  const user = await User.findOne({ token: token });

  try {
    // console.log(req.files.image.path);
    // cloudinary.v2.uploader.upload(req.files.image.path, (error, result) => {
    //   if (error) {
    //     console.log("error upload");
    //   } else {
    //     console.log(result.url);
    //   }
    // });
    const newOffer = await new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      pictures: req.files,
      creator: user
      //TODO upload to cloudinary and get link
    });

    await newOffer.save();
    return res.json({ message: "Offer created" });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});
// READ   ***********

// UPDATE ***********

// DELETE ***********

module.exports = router;
