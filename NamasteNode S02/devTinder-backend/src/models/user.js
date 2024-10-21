const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 25,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 30,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Gender value is incorrect");
        }
      },
    },
    skills: {
      type: [String],
      trim: true,
    },
    about: {
      type: String,
      default: "This is the deafult value for about",
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1729382400&semt=ais_hybrid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
