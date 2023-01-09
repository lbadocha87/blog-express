const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authApiHelper");

const userApiController = require("../controllers/userApiController");

router.get("/", auth, userApiController.index);
router.post("/signup", userApiController.create);
router.post("/login", userApiController.login);

module.exports = router;
