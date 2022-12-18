const express = require("express");
const router = express.Router();

const userContreller = require('../controllers/userController')


router.get("/add", (_req, res) => res.render("userView/addUser"));
router.post("/signup", userContreller.create);
router.get("/login", (_req, res) => res.render("userView/loginUser"));
router.post("/login", userContreller.login);

module.exports = router;