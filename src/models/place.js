const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  hours: {
    type: String,
  },
  tags: {
    type: Array,
  },
  activities: {
    type: Array,
  },
  featured: {
    type: Boolean,
  },
  verified: {
    type: Boolean,
  },
  recommended: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Place", placeSchema);
