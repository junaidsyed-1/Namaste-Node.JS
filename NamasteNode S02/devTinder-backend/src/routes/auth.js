const express = require("express");
const { validateSignUp } = require("../utils/validate");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, emailId } = req.body;

    // Validating the data
    validateSignUp(req);

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.json({ message: "User Saved successfully", data: { user } });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //Check if there is a user
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Compare the password
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // create a Jwt Token and send it to the client
    const token = await user.setJwtToken();
    res.cookie("token", token);
    res.json({ message: "User Logged In Success", data: { user } });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out");
});

module.exports = router;
