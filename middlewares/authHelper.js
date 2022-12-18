const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.cookies["AuthToken"];
    if (!token) {
      console.log("token not exist");
      res.render("userView/loginUser", {
        error: true,
        message: "Please login",
      });
    }

    const decoded = jwt.verify(token, "someSecretKey");
    req.user = decoded;
    next();
  } catch {
    res.render("userView/loginUser", {
      error: true,
      message: "Please login",
    });
  }
};
