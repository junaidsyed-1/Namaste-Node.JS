const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // Create an instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Saved successfully");
  } catch (error) {
    res.status(400).send("User can not be saved");
  }
});

// Create a user API, to find a user by email;
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Get all the user - Feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("There are no users");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
