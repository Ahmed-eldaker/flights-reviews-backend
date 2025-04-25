const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middlewares/authmiddleware");

router.post("/", auth, async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
});
router.get("/:flightId", async (req, res) => {
  const reviews = await Review.find({ flight: req.params.flightId });
  res.json(reviews);
});
module.exports = router;
