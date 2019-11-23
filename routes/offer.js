const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.API_SECRET
});
// Add authentication check with middleware!!!
// Get Offer mdl
const Offer = require("../models/offer");
const User = require("../models/user");

// CREATE ***********
router.post("/api/offer/publish", async (req, res) => {
  try {
    const auth = req.headers.authorization; // auth = Bearer token
    if (!auth) {
      res.status(401).json({
        error: "Missing Authorization Header"
      });
      return res.json({ message: "need authentication" });
    }
    // check if the auth is Bearer
    if (/^Bearer/.test(auth)) {
      console.log("Bearer true");
    } else {
      return res.json({ error: "not valid token" });
    }
    // check if token is valid
    const token = auth.substring(7);
    const user = await User.findOne({ token: token });
    // if user is valid
    if (user) {
      // req.fields / req.files are express-formidable syntax
      const newOffer = await new Offer({
        title: req.fields.title,
        description: req.fields.description,
        price: req.fields.price,
        pictures: req.files ? req.files : null,
        creator: user
      });
      // checking if there is a picture
      if (req.files.files) {
        const picture = newOffer.pictures[0].files.path;
        // Send obj to Cloudinary and get back url
        const cloudImg = await cloudinary.v2.uploader.upload(
          picture,
          (error, result) => {
            if (error) {
              return res.json({ message: "error uploading" });
            } else {
              console.log(result.url);
              // image URL
              return result.url;
            }
          }
        );
        // waiting for cloudinary answer
        newOffer.pictures = await cloudImg.url;
      }
      // saving the new offer
      await newOffer.save();
      return res.json({ message: "done" });
    } else {
      return res.json({ message: "You need to be authenticated" });
    }
  } catch (err) {
    return res.json(err.message);
  }
});
// READ   ***********

router.post("/api/offer/with-count", async (req, res) => {
  try {
    const listAll = await Offer.find()
      .limit(req.query.limit ? Number(req.query.limit) : null)
      .skip(req.query.skip ? Number(req.query.skip) : null)
      .populate("user")
      .populate({
        path: "creator",
        model: User,
        select: { _id: 1, "account.phone": 1, "account.username": 1 } // populate only selected fields
      });

    res.json({ count: listAll.length, offers: listAll });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

router.get("/api/offer/", async (req, res) => {
  try {
    const listAll = await Offer.findOne({ _id: req.query.id }).populate({
      path: "creator",
      model: User,
      select: { _id: 1, "account.phone": 1, "account.username": 1 }
    });
    res.json(listAll);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});
// UPDATE ***********
// TODO ability to modify a post

// DELETE ***********
// TODO ability to delete a post

module.exports = router;
