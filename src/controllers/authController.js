const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Decode the Google token
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { sub: googleId, email, name, picture } = decodedToken; // Ensure picture is included in the Google token

    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // If not, create a new user
      user = new User({ googleId, email, name, avatar: picture, password: "" }); // Add fields as needed
      await user.save();
    }

    // Generate a JWT token for the user, including additional fields
    const jwtPayload = {
      id: user._id,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      password: user.password,
    };

    const jwtToken = jwt.sign(jwtPayload, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
