const express = require("express");
const port = 7777;

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling route 1");
    next();
    res.send("respone!");
  },
  (req, res) => {
    console.log("Handling route 2");
    res.send("RESPONSE 2!!");
  }
);

app.listen(port, () => {
  console.log("app is successfully listening to port:", port);
});
