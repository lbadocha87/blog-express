// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
mongoose.connect("mongodb://127.0.0.1/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', Post);