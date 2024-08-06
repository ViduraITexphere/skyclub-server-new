const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itineraryController");
const auth = require("../middleware/auth"); // Middleware for token validation

// Route to save itinerary
router.post("/save", auth, itineraryController.saveItinerary);

// Route to get itinerary by Google ID
router.post("/get", auth, itineraryController.getItinerary);

// New route to get all itineraries by Google ID
router.post("/getAll", auth, itineraryController.getAllItineraries);

module.exports = router;
