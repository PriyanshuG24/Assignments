const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/requireAuth')
const { createPost, getAllPosts, deletePost, getMyAllPosts } = require('../controllers/post.controller')
router.post("/create-post", requireAuth, createPost);
router.get("/get-all-posts", getAllPosts);
router.delete("/delete-post/:id", requireAuth, deletePost);
router.get("/get-my-posts", requireAuth, getMyAllPosts);
module.exports = router