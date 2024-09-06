const Place = require("../models/place");
const Hotel = require("../models/hotel");

exports.generateItinerary = async (req, res) => {
  try {
    const { city, totalDays, attractions } = req.body;

    // Find places that match the city and attractions
    const places = await Place.find({
      city,
      activities: { $in: attractions },
    });

    if (!places.length) {
      return res.status(404).json({ message: "No matching places found" });
    }

    // Separate places and restaurants
    const restaurants = await Place.find({
      city,
      category: "Restaurant",
    });

    const nonRestaurantPlaces = places.filter(
      (place) => place.category !== "Restaurant"
    );

    // Sort places and restaurants by rating (optional)
    const sortedPlaces = nonRestaurantPlaces.sort(
      (a, b) => b.rating - a.rating
    );
    const sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating);

    // Calculate the number of places per day
    const placesPerDay = Math.floor(sortedPlaces.length / totalDays);
    const remainderPlaces = sortedPlaces.length % totalDays;

    const itineraryDays = [];
    for (let i = 0; i < totalDays; i++) {
      itineraryDays.push({ day: i + 1, places: [], restaurants: [] });
    }

    let placeIndex = 0;
    for (let i = 0; i < totalDays; i++) {
      const extraPlace = i < remainderPlaces ? 1 : 0;
      const dayPlacesCount = placesPerDay + extraPlace;
      itineraryDays[i].places = sortedPlaces.slice(
        placeIndex,
        placeIndex + dayPlacesCount
      );
      placeIndex += dayPlacesCount;
    }

    // Assign 2 restaurants to each day
    let restaurantIndex = 0;
    itineraryDays.forEach((day) => {
      for (let i = 0; i < 2; i++) {
        if (sortedRestaurants.length > 0) {
          day.restaurants.push(
            sortedRestaurants[restaurantIndex % sortedRestaurants.length]
          );
          restaurantIndex++;
        }
      }
    });

    res.json(itineraryDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get hotels related with city
exports.getHotelsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    // console.log("city::", city);

    // Find hotels that match the city
    const hotels = await Hotel.find({
      city,
      category: "Hotel",
    });

    if (!hotels.length) {
      return res
        .status(404)
        .json({ message: "No hotels found for this city." });
    }

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
