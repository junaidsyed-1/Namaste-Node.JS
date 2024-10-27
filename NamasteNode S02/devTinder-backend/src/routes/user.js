const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName age skills gender photoUrl about"
    );

    res.json({ message: "Data fetched Successfuly", data: connectionRequest });
  } catch (error) {
    res.status(400).json({ ERROR: error.message });
  }
});

module.exports = router;
