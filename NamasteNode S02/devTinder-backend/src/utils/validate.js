const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter a name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfile = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];

  const isEditdAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditdAllowed;
};

module.exports = {
  validateSignUp,
  validateEditProfile,
};
