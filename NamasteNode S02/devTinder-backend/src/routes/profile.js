const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json(user);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // validator function to check the valid fields
    validateEditProfile(req);
    if (!validateEditProfile(req)) {
      throw new Error("Edit not allowed");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile has been updated`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // validate the input
    const { changePassword, password } = req.body;
    if (!password || !changePassword) {
      throw new Error("Both current and new passwords are required");
    }

    // check if the old password is correct or not
    const isOldPasswordCorrect = await user.verifyPassword(password);
    if (!isOldPasswordCorrect) {
      throw new Error("Old password is incorrect");
    }

    // Check if the new password is strong or not
    const validateNewPassword = validator.isStrongPassword(changePassword);
    if (!validateNewPassword) {
      throw new Error("New password is weak, must enter a strong password");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(changePassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: "Password changed" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

module.exports = router;
