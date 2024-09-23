const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to get user profile
router.get("/profile/:googleId", userController.getUserProfile);

// Route to update user profile
router.put("/profile/:googleId", userController.updateUserProfile);

module.exports = router;
