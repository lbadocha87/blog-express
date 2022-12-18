const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  index: (_req, res) => {
    User.find()
      .lean()
      .exec((err, users) => {
        if (err) {
          res.send("Users list error");
        } else {
          res.render("userView/usersList", { users });
        }
      });
  },
  create: (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err) => {
      if (err) {
        res.render("userView/addUser", {
          error: true,
          message: "User already exist",
          user: { email: req.body.email, password: req.body.password },
        });
      } else {
        res.redirect("/blog");
      }
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        res.send("Error");
        return;
      }

      if (!user) {
        res.render("userView/loginUser", {
          error: true,
          message: "That user does not exist",
          user: { email: req.body.email, password: "" },
        });
        return;
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
           (err, logged) => {
            if (err) {
              res.render("userView/loginUser", {
                error: true,
                message: "Login error",
                user: { email: req.body.email, password: "" },
              });
            }
            if (logged) {
              const token = user.generateAuthToken(user);

              // Setting the auth token in cookies
              res.cookie("AuthToken", token);
              res.redirect("/blog");
            } else {
              res.render("userView/loginUser", {
                error: true,
                message: "Login data do not match",
                user: { email: req.body.email, password: "" },
              });
            }
          }
        );
      }
    });
  },
};
