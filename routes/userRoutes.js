const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authHelper");

const userContreller = require("../controllers/userController");

router.get("/", auth, userContreller.index);
router.get("/add", (_req, res) => res.render("userView/addUser"));
router.post("/signup", userContreller.create);
router.get("/login", (_req, res) => res.render("userView/loginUser"));
router.post("/login", userContreller.login);
router.get("/logout", (_req, res) => {
  res.cookie("AuthToken", "");
  res.redirect('/blog/login')
});

module.exports = router;
