const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  googleId: String,
  itinerary: Object,
  // Add any other necessary fields here
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
