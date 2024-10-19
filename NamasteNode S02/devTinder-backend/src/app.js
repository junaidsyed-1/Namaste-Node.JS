const express = require("express");
const port = 7777;

const app = express();

app.use("/getUser", (req, res) => {
  throw new Error("Random error");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log("app is successfully listening to port:", port);
});
