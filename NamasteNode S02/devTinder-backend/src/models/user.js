const mongoose = require("mongoose");
const validator = require("validator");

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
      maxLength: 80,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Weak password");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 30,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid Email");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          if (!["male", "female"].includes(value)) {
            throw new Error("Gender value is incorrect");
          }
        },
      },
    },
    skills: {
      type: [String],
      trim: true,
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "You can only enter up to 10 skills.",
      },
    },
    about: {
      type: String,
      default: "This is the deafult value for about",
      trim: true,
      validate: {
        validator: function (str) {
          return str.length <= 200;
        },
        message: "You can only enter 200 characters.",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1729382400&semt=ais_hybrid",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("URL is not correct");
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
