const Post = require("../models/postModel");

module.exports = {
  index: (_req, res) => {
    Post.find()
      .lean()
      .exec(function (err, posts) {
        if (err) {
          return res.send("Get posts error");
        }
        res.render("blogViews/blog", { posts: posts });
      });
  },

  post: (req, res) => {
    Post.findById(req.params.id).exec(function (err, post) {
      if (err) {
        return res.send("Get posts error");
      }
      res.render("blogViews/singlePost", post);
    });
  },

  create: (req, res) => {
    console.log(req.body);
    let newPost = new Post(req.body);
    newPost.save();
    res.redirect("/blog");
  },

  update: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body).exec(function (err, post) {
      if (err) {
        return res.send("Get posts error");
      }
      res.redirect("/blog/" + post._id);
    });
  },

  delete: (req, res) => {
    Post.findOneAndDelete(req.params.id, req.body).exec(function (err) {
      if (err) {
        return res.send("Get posts error");
      }
      res.redirect("/blog");
    });
  },

  editForm: (req, res) => {
    Post.findById(req.params.id).exec(function (err, post) {
      if (err) {
        return res.send("Get posts error");
      }
      res.render("blogViews/editPost", post);
    });
  },
};
