const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const placeRoutes = require("./src/routes/placeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const itineraryRoutes = require("./src/routes/itinerary");
const emailRoutes = require("./src/routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected! 🍃"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/sendEmail", emailRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
