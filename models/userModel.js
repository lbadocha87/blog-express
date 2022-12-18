// Import the mongoose module
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

User.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hashPassword) {
      if (err) {
        return next(err);
      }

      user.password = hashPassword;
      next();
    });
  });
});

User.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'someSecretKey', {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", User);
