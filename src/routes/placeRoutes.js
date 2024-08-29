const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const suggestController = require("../controllers/suggestController");

router.post("/", placeController.createPlace);
router.post("/itinerary", suggestController.generateItinerary);
router.get("/cities", placeController.getCities);
router.get("/place", placeController.getPlaces);
router.get('/hotels/:city', suggestController.getHotelsByCity);

module.exports = router;
