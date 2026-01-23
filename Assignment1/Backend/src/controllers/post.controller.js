const Post = require("../models/Post");
const { validatePost } = require("../utils/post.validation");

const createPost = async (req, res) => {
    try {
        const { error } = validatePost(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const { title, content } = req.body;
        const post = new Post({
            user: req.user._id,
            title,
            content,
        });
        await post.save();
        return res
            .status(201)
            .json({
                success: true,
                message: "Post created successfully",
                post: {
                    ...post.toObject(),
                    user: { _id: req.user._id, username: req.user.username }
                }
            });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to create post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find({}).populate('user', 'username').skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Post.countDocuments();
        const result = {
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        }
        return res.status(200).json({ success: true, message: "Posts fetched successfully", result });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to create post" });
    }
};

const getMyAllPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ user: userId }).populate('user', 'username').skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Post.countDocuments({ user: userId });
        const result = {
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        }
        return res.status(200).json({ success: true, message: "Posts fetched successfully", result });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to create post" });
    }
}


const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOneAndDelete({
            _id: postId,
            user: req.user._id
        });
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to delete post" });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    getMyAllPosts
};
