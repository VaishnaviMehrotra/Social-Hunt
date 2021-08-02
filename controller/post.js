const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

module.exports = {
  async getAllPost(req, res) {
    try {
      const post = await Post.find({})
        .populate("user", { name: 1, image: 1 })
        .sort({ createdAt: -1 });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async getPersonalPost(req, res) {
    try {
      const post = await Post.find({ user: req.user._id })
        .populate("user", {
          name: 1,
          image: 1,
        })
        .sort({ createdAt: -1 });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async getParticularUserFollow(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      const following = user.following.map((user) => user.user);
      const post = await Post.find({
        user: { $in: [...following, userId] },
      })
        .populate("user", {
          name: 1,
          image: 1,
        })
        .sort({ createdAt: -1 });

      res.status(200).send(post);
    } catch (err) {
      console.log(err);
    }
  },
  async getParticularPost(req, res) {
    try {
      const post = await Post.findById(req.params.postId).populate("user", {
        name: 1,
        image: 1,
      });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async getUserPost(req, res) {
    try {
      const post = await Post.find({ user: req.params.userId })
        .populate("user", { name: 1, image: 1 })
        .sort({ createdAt: -1 });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async addPost(req, res) {
    try {
      const post = new Post({ ...req.body, user: req.user._id });
      newPost = await post.save();
      res.status(201).send(newPost);
    } catch {
      res.status(500).send("Internal Server Error");
    }
  },
  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      await Post.findByIdAndDelete(postId);
      await Comment.findOneAndDelete(postId);
      res.status(200).json({ msg: `Post ${postId} deleted` });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async editPost(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: { ...req.body },
        },
        { new: true }
      );
      res.status(200).json({ post });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      const userId = req.user._id;
      let result = post.likes.filter((item) => item.user == userId);
      if (result.length !== 0) {
        await post.updateOne({ $pull: { likes: { user: userId } } });
        res.status(200).send(post);
      } else {
        await post.updateOne({ $push: { likes: { user: userId } } });
        res.status(200).send(post);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getAllLikes(req, res) {
    try {
      console.log("hi");
      const post = await Post.findById(req.params.postId).populate(
        "likes.user",
        {
          name: 1,
          image: 1,
        }
      );
      res.status(200).send(post.likes);
    } catch (err) {
      console.log(err);
    }
  },
};
