import express from "express";
const router = express.Router();
import User from "../models/user.js"; // Import User model

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Fixed the typo for 'password'

  try {
    const user = await User.findOne({ email, password }); // Corrected syntax for findOne
    if (user) {
      res.send(user); // Return user details
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
