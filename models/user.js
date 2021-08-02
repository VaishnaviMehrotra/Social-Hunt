const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "http://localhost:5000/images/pimage.jpg"
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // following:{
    //   type: Array,
    //   default:[],
    // },
    // following: [
    //   {
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" },
    //   }
    // }
    // ],
    following: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    followers: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    // following: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" },
    //   },
    // ],
    // followers:{
    //   type: Array,
    //   default:[],
    // }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
