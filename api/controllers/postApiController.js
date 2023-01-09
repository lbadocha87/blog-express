const Post = require("../../models/postModel");
const User = require("../../models/userModel");

module.exports = {
  index: (req, res) => {
    const findQuery = req.query.user ? { author: req.query.user } : {};
    Post.find(findQuery)
      .populate("author")
      .lean()
      .exec((err, posts) => {
        if (err) {
          return res.json({ error: "Get posts error" });
        }
        res.json(posts);
      });
  },

  post: (req, res) => {
    Post.findById(req.params.id).exec((err, post) => {
      if (err) {
        return res.json({ error: "Get post error" });
      }
      res.json(post);
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
        return res.json({ error: "Update post error" });
      }
      res.json(post);
    });
  },

  delete: (req, res) => {
    Post.findOneAndDelete(req.params.id, req.body).exec((err) => {
      if (err) {
        return res.json({ error: "Delete post error" });
      }
      res.json({deleted: true});
    });
  }
};
