// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
mongoose.connect("mongodb://127.0.0.1/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
