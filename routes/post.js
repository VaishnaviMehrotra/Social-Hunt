const express = require('express');
const router = express.Router();
const authMiddleware = require("../config/auth");
const postController = require("../controller/post");

router.post("/", authMiddleware, postController.addPost);
router.get("/", authMiddleware, postController.getAllPost);
router.get("/personalPost", authMiddleware, postController.getPersonalPost);
router.get("/getUserPost", authMiddleware, postController.getParticularUserFollow);
router.get("/user/:userId", authMiddleware, postController.getUserPost);
router.get("/:postId", authMiddleware, postController.getParticularPost);
router.put("/edit/:postId", authMiddleware, postController.editPost);
router.delete("/:postId", authMiddleware, postController.deletePost);
router.put("/likes/:id" , authMiddleware, postController.likePost);
router.get("/getlikes/:postId", authMiddleware, postController.getAllLikes);

module.exports = router;

