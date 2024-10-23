const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Get the token from the req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token: Try Logging In again!");
    }

    // Validate the token
    const tokenPayload = await jwt.verify(token, "SECRETKEY@123");
    const { _id } = tokenPayload;

    // Get the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    // Sending the user info in req
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
