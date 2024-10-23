const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");
const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({ data: user });
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

module.exports = router;
