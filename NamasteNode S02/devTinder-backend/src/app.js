const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      skills,
      photoUrl,
      about,
    } = req.body;
    // Validate the data
    validateSignUp(req);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create an instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      skills,
      photoUrl,
      about,
    });

    await user.save();
    res.send("User Saved successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if there is a user
    const user = await User.findOne({ emailId });
    const { _id } = user;
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials!");
    } else {
      // Create a token and send it to cookie
      const token = jwt.sign({ _id }, "SECRETKEY@123");

      res.cookie("token", token);
      res.send("Login Successfull");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    const tokenPayload = await jwt.verify(token, "SECRETKEY@123");
    const { _id } = tokenPayload;

    const user = await User.findById(_id);

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "photoUrl", "skills", "gender", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Lets update a user using email - findOneAndUpdate and i have also used options: returnDocument
// app.patch("/user", async (req, res) => {
//   const emailId = req.body.emailId;
//   const data = req.body;

//   try {
//     const user = await User.findOneAndUpdate({ emailId: emailId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Something went wrong.." + error.message);
//   }
// });

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
