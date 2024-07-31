const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itineraryController");
const auth = require("../middleware/auth"); // Middleware for token validation

router.post("/save", auth, itineraryController.saveItinerary);
// console log to check if the route is working
router.post("/save", (req, res) => {
  res.send("Itinerary route is working 🚀");
});

module.exports = router;
