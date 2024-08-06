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

exports.getItinerary = async (req, res) => {
  const { googleId } = req.body;
  try {
    const itinerary = await Itinerary.findOne({ googleId });
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New controller to get all itineraries for a Google ID
exports.getAllItineraries = async (req, res) => {
  const { googleId } = req.body;
  try {
    const itineraries = await Itinerary.find({ googleId });
    if (itineraries.length > 0) {
      res.status(200).json(itineraries);
    } else {
      res.status(404).json({ message: "No itineraries found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};