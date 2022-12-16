const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.index);
router.get("/add", (_req, res) => res.render("blogViews/addPost"));
router.get("/:id", postController.post);
router.post("/:id", postController.create);
router.get("/edit/:id", postController.editForm);
router.post("/edit/:id", postController.update);
router.get("/delete/:id", postController.delete);

module.exports = router;
