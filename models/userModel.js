// Import the mongoose module
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

User.pre("save",  (next) => {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

});

User.methods.generateAuthToken =  () => {
  const token = jwt.sign({ _id: this._id }, "someSecretKey", {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", User);
