const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const placeRoutes = require("./src/routes/placeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const itineraryRoutes = require("./src/routes/itinerary");
const emailRoutes = require("./src/routes/emailRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Increase payload size limit
app.use(express.json({ limit: "50mb" })); // Adjust the size according to your needs
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
