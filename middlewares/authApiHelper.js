const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied" });

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = decoded;

    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};
