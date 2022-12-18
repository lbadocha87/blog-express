const Post = require("../models/postModel");
const User = require("../models/userModel");

module.exports = {
  index: (req, res) => {
    const findQuery = req.query.user ? { author: req.query.user } : {};

    Post.find(findQuery)
      .populate("author")
      .lean()
      .exec((err, posts) => {
        if (err) {
          return res.send("Get posts error");
        }
        res.render("blogViews/blog", { posts: posts });
      });
  },

  post: (req, res) => {
    Post.findById(req.params.id).exec((err, post) => {
      if (err) {
        return res.send("Get posts error");
      }
      res.render("blogViews/singlePost", post);
    });
  },

  create: (req, res) => {
    let newPost = new Post({ ...req.body, author: res.locals.userId });
    newPost.save();

    User.findById(res.locals.userId, (err, user) => {
      if (err) return;

      user.posts.push(newPost._id);
      user.save();
    });

    res.redirect("/blog");
  },

  update: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body).exec((err, post) => {
      if (err) {
        return res.send("Get posts error");
      }
      res.redirect("/blog/" + post._id);
    });
  },

  delete: (req, res) => {
    Post.findOneAndDelete(req.params.id, req.body).exec((err) => {
      if (err) {
        return res.send("Get posts error");
      }
      res.redirect("/blog");
    });
  },

  editForm: (req, res) => {
    Post.findById(req.params.id).exec((err, post) => {
      if (err) {
        return res.send("Get posts error");
      }
      res.render("blogViews/editPost", post);
    });
  },
};
