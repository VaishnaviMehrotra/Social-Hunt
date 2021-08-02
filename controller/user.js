const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();


const createAccessToken = (payload, expiresIn = "365d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  async registerUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "User already Exist" });
      }

      let saltRounds = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      let newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      user = await newUser.save();
      let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        followers: user.followers,
        following: user.following,
        city: user.city,
        bio: user.bio,
        image: user.image,
        gender: user.gender,
      };

      let accessToken = createAccessToken(payload);

      res.status(201).json({ payload, accessToken });
    } catch (err) {
      console.log(err);
    }
  },
  async fetchUser(req, res) {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err);
    }
  },

  async getParticularUser(req, res) {
    try {
      const user = await User.findById(req.params.userId, { password: 0 });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err);
    }
  },

  async loginUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        let payload = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isVerified: user.isVerified,
          followers: user.followers,
          following: user.following,
          city: user.city,
          bio: user.bio,
          image: user.image,
          gender: user.gender,
        };
        let accessToken = createAccessToken(payload);

        return res.status(200).json({ payload, accessToken });
      }
      return res.status(400).json({ msg: "Invalid credentials" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getAllUsers(req, res) {
    try {
      const user = await User.find({}, { password: 0 });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.user._id;
      await User.findByIdAndDelete(userId);
      await Post.findOneAndDelete({ user: userId });
      await Comment.findOneAndDelete({ user: userId });
      res.status(200).send(`User ${userId} deleted.`);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async updateUser(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: { ...req.body },
        },
        {
          new: true,
          projection: {
            password: 0,
          },
        }
      );
      let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        followers: user.followers,
        following: user.following,
        city: user.city,
        bio: user.bio,
        image: user.image,
        gender: user.gender,
      };
      let accessToken = createAccessToken(payload);

      return res.status(200).json({ payload, accessToken });
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err);
    }
  },
  async followUser(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      const newUser = await User.findById(req.body._id);
      let result = newUser.followers.filter((item) => item.user === userId);
      if (result.length !== 0) {
        throw new Error("You Already followed");
      } else {
        await user.updateOne({ $push: { following: { user: req.body._id } } });
        await newUser.updateOne({ $push: { followers: { user: userId } } });
        res.status(200).send("followed");
      }
    } catch (err) {
      console.log(err);
    }
  },
  async unFollowUser(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      const newUser = await User.findById(req.body._id);
      let result = newUser.followers.filter((item) => item.user !== userId);
      if (result.length !== 0) {
        await user.updateOne({ $pull: { following: { user: req.body._id } } });
        await newUser.updateOne({ $pull: { followers: { user: userId } } });
        res.status(200).send("unfollowed");
      } else {
        throw new Error("you dont't follow yet");
      }
    } catch (err) {
      console.log(err);
    }
  },

  async getFollowers(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate("followers.user", {
        name: 1,
        image: 1,
      });
      res.status(200).send(user.followers);
    } catch (err) {
      console.log(err);
    }
  },
  async getFollowing(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate("following.user", {
        name: 1,
        image: 1,
      });
      res.status(200).send(user.following);
    } catch (err) {
      console.log(err);
    }
  },

  
  async upload(req, res) {
    try {
      res.status(200).send("Successfully uplaoded");
    } catch (err) {
      res.status(500).send("internal server error");
    }
  },
};
