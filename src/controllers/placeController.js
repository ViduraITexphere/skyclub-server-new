const Place = require("../models/place");

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const {
      name,
      country,
      city,
      description,
      image,
      rating,
      reviews,
      category,
      duration,
      hours,
      tags,
      activities,
      featured,
      verified,
      recommended,
    } = req.body;
    const newPlace = new Place({
      name,
      country,
      city,
      description,
      image,
      rating,
      reviews,
      category,
      duration,
      hours,
      tags,
      activities,
      featured,
      verified,
      recommended,
    });
    const savedPlace = await newPlace.save();
    console.log("Place saved successfully:", savedPlace); // Log the saved place

    res.status(201).json(savedPlace);
  } catch (error) {
    console.error("Error saving place:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

// Get all cities
exports.getCities = async (req, res) => {
  try {
    const cities = await Place.find().distinct("city");
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all places
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: error.message });
  }
};
