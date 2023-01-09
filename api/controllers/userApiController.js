const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  index: (_req, res) => {
    User.find()
      .lean()
      .exec((err, users) => {
        if (err) {
          return res.json({ error: "Get users error" });
        } else {
          res.json(users);
        }
      });
  },
  create: (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.json({
          error: true,
          message: "User already exist",
        });
      } else {
        res.json({
          success: true,
          user: { name: user.name, email: user.email },
        });
      }
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        return res.json({ error: "Login user error" });
      }

      if (!user) {
        res.json({
          error: true,
          message: "That user does not exist",
        });
        return;
      } else {
        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.json({
              error: true,
              message: "Login error",

            });
          }
          if (logged) {
            const token = user.generateAuthToken(user);
            res.json({name: user.name, email: user.email, jwt: token});
          } else {
            res.json({
              error: true,
              message: "Login data do not match",
    
            });
          }
        });
      }
    });
  },
};
