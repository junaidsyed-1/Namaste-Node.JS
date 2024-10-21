const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Create an instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Saved successfully");
  } catch (error) {
    res.status(400).send("User can not be saved" + error.message);
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

app.get("/getUserByID", async (req, res) => {
  const id = req.body._id;

  const user = await User.findById(id);
  res.send(user);
});

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);

    res.send("User Deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Update a User- using findByIdAndUpdate
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(userId, data);
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// Lets update a user using email - findOneAndUpdate and i have also used options: returnDocument
app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ emailId: emailId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong.." + error.message);
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
