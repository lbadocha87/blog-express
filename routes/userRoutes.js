const express = require("express");
const router = express.Router();

const userContreller = require('../controllers/userController')


router.get("/add", (_req, res) => res.render("userView/addUser"));
router.post("/signup", userContreller.create);

module.exports = router;