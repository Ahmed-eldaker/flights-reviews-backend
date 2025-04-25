const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  //if the email exist
  if (existing) return res.status(400).json({ msg: "email already exists" });
  //if not hashed the pass

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.json({ msg: "User Registered" });
});

//Log In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //check if the user exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "invalid" });
  //check if the password is the same
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "invalid" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user: { user: user._id, name: user.name } });
});

module.exports = router;
