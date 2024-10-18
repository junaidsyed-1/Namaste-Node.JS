const express = require("express");
const port = 7777;

const app = express();
const { adminAuth, userAuth } = require("../middlewares/auth");

app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req, res) => {
  res.send("Fetched all Data successfully");
});

app.use("/admin/deleteAllData", (req, res) => {
  res.send("All data has been deleted");
});

app.use("/user/login", (req, res) => {
  res.send("Logged in success");
});

app.use("/user", userAuth, (req, res) => {
  res.send("User fetched success");
});

app.listen(port, () => {
  console.log("app is successfully listening to port:", port);
});
