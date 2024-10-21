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
