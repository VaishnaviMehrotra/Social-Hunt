const express = require('express');
const router = express.Router();
const authMiddleware = require("../config/auth");
const commentController = require("../controller/comment");

router.post("/:postId", authMiddleware, commentController.addComment);
router.get("/:postId", authMiddleware, commentController.getAllComments);
router.put("/:commentId", authMiddleware, commentController.editComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
