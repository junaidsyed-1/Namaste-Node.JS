const express = require("express");
const port = 7777;

const app = express();

app.use("/user", (req, res, next) => {
  console.log("Middleware: 1 , Handling the route 1");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("Middleware: 2, Handling the route 2");
  next();
});

app.get("/user", (req, res) => {
  console.log("Actual route handler");
  res.send("Response");
});

app.listen(port, () => {
  console.log("app is successfully listening to port:", port);
});
