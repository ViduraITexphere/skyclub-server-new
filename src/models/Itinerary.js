// const mongoose = require("mongoose");

// const ItinerarySchema = new mongoose.Schema({
//   googleId: String,
//   itinerary: Object,
//   // Add any other necessary fields here
// });

// module.exports = mongoose.model("Itinerary", ItinerarySchema);

const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  itinerary: {
    type: Object,
    required: true,
  },
  selectedHotels: {
    type: Array, // Assuming it's an array of hotels
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ItinerarySchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Update the timestamp before saving
  next();
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
