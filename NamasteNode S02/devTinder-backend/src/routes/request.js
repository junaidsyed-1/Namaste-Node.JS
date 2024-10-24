const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: `${status} is not allowed` });
    }

    // Check if the user we are sending req to even exist in our DB or not
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { toUserId: fromUserId, fromUserId: toUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(404)
        .json({ message: "Connection request already exist!" });
    }

    const sendConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await sendConnectionRequest.save();
    res.json({ message: "Connection Request sent successfully", data });
  } catch (error) {
    res.status(400).json({ ERROR: error.message });
  }
});

module.exports = router;
