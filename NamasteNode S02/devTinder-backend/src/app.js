const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
