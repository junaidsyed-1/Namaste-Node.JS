const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Khabib",
    lastName: "nag",
    emailId: "khabib@mail.com",
    age: 32,
  };

  // Create an instance of the user model
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error occured " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Datababse connected successfully..");
    app.listen(port, () => {
      console.log("app is successfully listening to port:", port);
    });
  })
  .catch((err) => {
    console.log("Can not connect to DB:", err);
  });
