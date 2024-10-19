const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jaanusd79:lh5qjOBerdWCXQVW@namastenode.nud25.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
