const Comment = require('../models/comment');

module.exports = {
    async getAllComments(req, res) {
        try {
            const comments = await Comment.find({post: req.params.postId}).populate("user", { name: 1 });
            res.status(200).send(comments);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async addComment(req, res) {
        try {
            const comment = new Comment({ ...req.body, user: req.user._id, post: req.params.postId });
            newComment = await comment.save();
            res.status(201).send(newComment)
        }
        catch(err) {
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async deleteComment(req, res) {
        try {
            const { commentId } = req.params;
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json({ msg: `Comment ${commentId} deleted` });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async editComment(req, res) {
        try {
            const { commentId } = req.params;
            const comment = await Comment.findOneAndUpdate(
                { _id: commentId },
                {
                    $set: { ...req.body },
                },
                { new: true }
            );
            res.status(200).json({ comment });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
}