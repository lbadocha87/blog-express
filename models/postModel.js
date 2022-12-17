// Import the mongoose module
const mongoose = require("mongoose");

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