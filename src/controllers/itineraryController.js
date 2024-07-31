const Itinerary = require("../models/Itinerary");

exports.saveItinerary = async (req, res) => {
  const { googleId, itinerary } = req.body;
  console.log("googleId:", googleId, "itinerary:", itinerary);
  try {
    let newItinerary = new Itinerary({ googleId, itinerary });
    newItinerary = await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
