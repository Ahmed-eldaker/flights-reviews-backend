const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const auth = require("../middlewares/authmiddleware");

router.post("/", auth, async (req, res) => {
  const flight = new Flight(req.body);
  await flight.save();
  res.json(flight);
});

router.get("/", async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});
module.exports = router;
