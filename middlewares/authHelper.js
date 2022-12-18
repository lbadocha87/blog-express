const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

module.exports = function (req, res, next) {
  try {
    const token = req.cookies["AuthToken"];
    if (!token) {
      res.render("userView/loginUser", {
        error: true,
        message: "Please login to use app",
      });
    } else {
      const decoded = jwt.verify(token, "someSecretKey");

      res.locals.userId = decoded._id;
      next();
    }
  } catch {
    res.render("userView/loginUser", {
      error: true,
      message: "Please login",
    });
  }
};
