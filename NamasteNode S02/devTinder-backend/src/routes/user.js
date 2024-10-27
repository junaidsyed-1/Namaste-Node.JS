const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_DATA = "firstName lastName age gender photoUrl about";

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

    if (connectionRequest.length === 0) {
      return res.status(404).json({ message: "No connection requests found" });
    }

    res.json({ message: "Data fetched Successfuly", data: connectionRequest });
  } catch (error) {
    res.status(400).json({ ERROR: error.message });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.json({ message: "Invalid Id" });
    }

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    if (!connectionRequest || connectionRequest.length === 0) {
      return res.status(404).json({ message: "No connections found" });
    }

    const data = connectionRequest.map((row) => {
      if (row.toUserId._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      return row.toUserId;
    });

    res.json({ message: "User data", data });
  } catch (error) {
    res.status(400).json({ ERROR: error.message });
  }
});

module.exports = router;
