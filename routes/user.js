const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/user");

// CREATE ***********
router.post("/user/sign_up", async (req, res) => {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.body.password + salt).toString(encBase64);
  try {
    const newUser = await new User({
      account: {
        username: req.body.username,
        email: req.body.email
      },
      token: token,
      salt: salt,
      hash: hash
    });
    await newUser.save();
    return res.json({
      _id: user._id,
      token: user.token,
      email: user.email,
      username: user.username
    });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});
// CREATE ***********
// UPDATE ***********
// DELETE ***********

module.exports = router;
