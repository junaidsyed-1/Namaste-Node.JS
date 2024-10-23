const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user.firstName + " sent a connection request");
});

module.exports = router;
