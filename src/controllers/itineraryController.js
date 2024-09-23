const Itinerary = require("../models/Itinerary");
const Quote = require("../models/quotes");
const mongoose = require("mongoose");

// exports.saveItinerary = async (req, res) => {
//   const { googleId, itinerary, selectedHotels } = req.body;
//   console.log("googleId:", googleId, "itinerary:", itinerary);
//   try {
//     let newItinerary = new Itinerary({ googleId, itinerary });
//     newItinerary = await newItinerary.save();
//     res.status(201).json(newItinerary);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.saveItinerary = async (req, res) => {
  const { googleId, itinerary, selectedHotels } = req.body;

  if (!googleId || !itinerary) {
    return res
      .status(400)
      .json({ error: "Google ID and itinerary are required" });
  }

  try {
    const newItinerary = new Itinerary({
      googleId,
      itinerary,
      selectedHotels: selectedHotels || [], // Handle the case if no selectedHotels are provided
    });

    const savedItinerary = await newItinerary.save();
    return res.status(201).json(savedItinerary);
  } catch (error) {
    console.error("Error saving itinerary:", error.message);
    return res.status(500).json({ error: "Failed to save itinerary" });
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
    const { googleId, itinerary, userDetails, hotels } = req.body; // Extract values directly

    console.log("googleId::", googleId);
    console.log("itinerary::", itinerary);
    console.log("userDetails::", userDetails);

    // Validate request
    if (!googleId || !itinerary || !userDetails || !hotels) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new quote with extracted values
    const newQuote = new Quote({
      googleId,
      itinerary,
      userDetails,
      hotels,
    });

    // Save to database
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error("Error saving quote:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// New controller to get all quotes for a Google ID
exports.getAllQuotes = async (req, res) => {
  const { googleId } = req.body;
  try {
    // Find quotes that have the 'totalCost' field defined
    const quotes = await Quote.find({
      googleId,
      "cost.totalCost": { $exists: true, $ne: null },
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

exports.deleteQuote = async (req, res) => {
  const { quoteId } = req.params; // Extract quoteId from route parameters
  try {
    const deletedQuote = await Quote.findByIdAndDelete(quoteId); // Find and delete the quote by ID
    if (deletedQuote) {
      res
        .status(200)
        .json({ message: "Quote deleted successfully", deletedQuote });
    } else {
      res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting the quote" });
  }
};

// Controller to revise a quote
// exports.reviseQuote = async (req, res) => {
//   const { quoteId } = req.params; // Extract quoteId from route parameters
//   const { itinerary, userDetails } = req.body; // Extract itinerary and userDetails from request body
//   try {
//     const updatedQuote = await Quote.findByIdAndUpdate(
//       quoteId,
//       { itinerary, userDetails },
//       { new: true }
//     ); // Find and update the quote by ID
//     if (updatedQuote) {
//       res.status(200).json(updatedQuote);
//     } else {
//       res.status(404).json({ message: "Quote not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Server error while updating the quote" });
//   }
// };

// exports.reviseQuote = async (req, res) => {
//   const { quoteId } = req.params;
//   const updatedData = req.body;

//   try {
//     // Use $set to create new fields if they don't exist
//     const updatedQuote = await Quote.findByIdAndUpdate(
//       quoteId,
//       {
//         $set: {
//           userDetails: updatedData.userDetails,
//           cost: updatedData.cost,
//           itinerary: updatedData.itinerary,
//           revised: updatedData.revision || "No",
//         },
//       },
//       { new: true, upsert: true }
//     );

//     if (!updatedQuote) {
//       return res.status(404).json({ message: "Quote not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Quote revised successfully", updatedQuote });
//   } catch (error) {
//     res.status(500).json({ message: "Error revising quote", error });
//   }
// };

exports.reviseQuote = async (req, res) => {
  const { quoteId } = req.params;
  const updatedData = req.body;

  console.log("Received updatedData:", updatedData); // Log the incoming data

  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      {
        $set: {
          // userDetails: updatedData.userDetails,
          // cost: updatedData.cost,
          // itinerary: updatedData.itinerary,
          revision: updatedData.revision || "No",
        },
      },
      { new: true, upsert: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    console.log("Updated quote:", updatedQuote); // Log the updated quote

    res
      .status(200)
      .json({ message: "Quote revised successfully", updatedQuote });
  } catch (error) {
    console.error("Error revising quote:", error); // Log the error
    res.status(500).json({ message: "Error revising quote", error });
  }
};

// Add a new route to pin a quote
exports.pinQuote = async (req, res) => {
  const { quoteId } = req.params;
  try {
    const updated = await Quote.findByIdAndUpdate(
      quoteId,
      { pinned: true },
      { new: true }
    );
    if (updated) {
      res.status(200).json({ message: "Quote pinned successfully", updated });
    } else {
      res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error pinning quote", error });
  }
};

// Corrected controller to handle Google ID for fetching pinned quotes
// Backend controller to get all pinned quotes by Google ID
// exports.getPinnedQuotes = async (req, res) => {
//   const { googleId } = req.query;

//   if (!googleId) {
//     return res.status(400).json({ message: "Google ID is required" });
//   }

//   try {
//     const pinnedQuotes = await Quote.find({
//       googleId: googleId,
//       pinned: true,
//     });

//     if (pinnedQuotes.length > 0) {
//       res.status(200).json(pinnedQuotes);
//     } else {
//       res
//         .status(404)
//         .json({ message: "No pinned quotes found for this Google ID" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching pinned quotes", error });
//   }
// };

// exports.getPinnedQuotes = async (req, res) => {
//   const { googleId } = req.query;

//   if (!googleId) {
//     return res.status(400).json({ message: "Google ID is required" });
//   }

//   // Check if Google ID is a valid ObjectId (which it should not be in your case)
//   if (!mongoose.Types.ObjectId.isValid(googleId)) {
//     console.log(
//       "Google ID is not a valid ObjectId. Proceeding with string search."
//     );
//   }

//   try {
//     // Query for quotes with Google ID and pinned: true
//     const pinnedQuotes = await Quote.find({
//       googleId: googleId, // Google ID is used as a string, not an ObjectId
//       pinned: true,
//     });

//     if (pinnedQuotes.length > 0) {
//       res.status(200).json(pinnedQuotes);
//     } else {
//       res
//         .status(404)
//         .json({ message: "No pinned quotes found for this Google ID" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching pinned quotes", error });
//   }
// };

// exports.getItinerary = async (req, res) => {
//   const { googleId } = req.body;
//   try {
//     const itinerary = await Itinerary.findOne({ googleId });
//     if (itinerary) {
//       res.status(200).json(itinerary);
//     } else {
//       res.status(404).json({ message: "Itinerary not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getPinnedQuotes = async (req, res) => {
  const { googleId } = req.body; // Fetch Google ID from request body

  if (!googleId) {
    return res.status(400).json({ message: "Google ID is required" });
  }

  try {
    // Find pinned quotes related to the provided Google ID
    const pinnedQuotes = await Quote.find({ googleId: googleId, pinned: true });

    if (pinnedQuotes.length > 0) {
      res.status(200).json(pinnedQuotes);
    } else {
      res
        .status(404)
        .json({ message: "No pinned quotes found for this Google ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching pinned quotes", error });
  }
};
