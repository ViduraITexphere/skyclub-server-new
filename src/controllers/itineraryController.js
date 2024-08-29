const Itinerary = require("../models/Itinerary");
const Quote = require("../models/quotes");

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


exports.getItineraryById = async (req, res) => {
  const { itineraryId } = req.params; // Get itineraryId from route parameters
  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Save itinerary with user details as a quote
exports.saveQuoteWithDetails = async (req, res) => {
  try {
    const { googleId, itinerary, userDetails } = req.body; // Extract values directly

    console.log("googleId::", googleId);
    console.log("itinerary::", itinerary);
    console.log("userDetails::", userDetails);

    // Validate request
    if (!googleId || !itinerary || !userDetails) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new quote with extracted values
    const newQuote = new Quote({
      googleId,
      itinerary,
      userDetails
    });

    // Save to database
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// New controller to get all quotes for a Google ID
exports.getAllQuotes = async (req, res) => {
  const { googleId } = req.body;
  try {
    // Find quotes that have the 'totalCost' field defined
    const quotes = await Quote.find({
      googleId,
      'cost.totalCost': { $exists: true, $ne: null }
    });
    
    if (quotes.length > 0) {
      res.status(200).json(quotes);
    } else {
      res.status(404).json({ message: "No quotes with total cost found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};