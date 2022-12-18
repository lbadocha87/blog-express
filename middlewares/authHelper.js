const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/userModel");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies["AuthToken"];
    if (!token) {
      res.render("userView/loginUser", {
        error: true,
        message: "Please login to use app",
      });
    } else {
      const decoded = jwt.verify(token, "someSecretKey");

       User.findById(decoded._id).exec((err, user)=>{
        if(err || !user) {
          res.render("userView/loginUser", {
            error: true,
            message: "Please login",
          });
        } else {
          res.locals.userId = decoded._id;
          res.locals.userName = user?.name;
          next();
        }
      });
      
    }
  } catch {
    res.render("userView/loginUser", {
      error: true,
      message: "Please login",
    });
  }
};
