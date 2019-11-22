const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Get User mdl
const User = require("../models/user");

// CREATE ***********
router.post("/user/sign_up", async (req, res) => {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);
  try {
    const newUser = await new User({
      account: {
        username: req.fields.username,
        email: req.fields.email
      },
      token: token,
      salt: salt,
      hash: hash
    });
    await newUser.save();
    return res.json({
      _id: newUser._id,
      token: newUser.token,
      email: newUser.account.email,
      username: newUser.account.username
    });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});
// READ   ***********
router.post("/user/log_in", async (req, res) => {
  //const hash = SHA256(req.fields.password + salt).toString(encBase64);
  //const toCheck = req.fields.password;
  try {
    const exist = await User.findOne({ "account.email": req.fields.email });
    if (exist) {
      console.log(exist);
      const salt = exist.salt;
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      // process password too check if hash stored is a match
      if (hash === exist.hash) {
        return res.json({
          token: exist.token,
          account: exist.account
        });
      } else {
        return res.json({ message: "Wrong password" });
      }
    }
    return res.json({ message: "Email not found" });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

// UPDATE ***********

// DELETE ***********

module.exports = router;
