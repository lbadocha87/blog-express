const express = require("express");
const postApiController = require("../controllers/postApiController");
const router = express.Router();

router.get("/", postApiController.index);;
router.get("/:id", postApiController.post);
router.post("/:id", postApiController.create);
router.put("/edit/:id", postApiController.update);
router.delete("/delete/:id", postApiController.delete);

module.exports = router;