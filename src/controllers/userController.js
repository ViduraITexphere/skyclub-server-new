const User = require("../models/userModel");

// Fetch user profile by Google ID
exports.getUserProfile = async (req, res) => {
  try {
    const googleId = req.params.googleId;

    const user = await User.findOne({ googleId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

// Update user profile by Google ID
exports.updateUserProfile = async (req, res) => {
  try {
    const googleId = req.params.googleId;

    // Ensure the request body includes all necessary fields
    const updatedUser = await User.findOneAndUpdate({ googleId }, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error });
  }
};
