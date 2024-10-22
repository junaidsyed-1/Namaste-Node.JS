const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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
      const token = jwt.sign({ _id }, "SECRETKEY@123", { expiresIn: "1d" });

      res.cookie("token", token);
      res.send("Login Successfull");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user.firstName + " sent a connection request");
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
