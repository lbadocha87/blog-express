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

User.pre('save', function(next) {
  let user = this;
   
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(Number(process.env.SALT), function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  })
})

User.methods.generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", User);
