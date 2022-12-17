const User = require("../models/userModel");

module.exports = {
  create: async (req, res) => {
    let newUser = new User(req.body);
    newUser.save(function (err) {
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
};
