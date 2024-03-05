import express from 'express'
import { getPosts, addPost, deletePost } from '../controllers/posts.js'

const router = express.Router();

router.get("/api/posts",getPosts);
router.post("/api/addPost",addPost);
router.delete("/api/deletePost/:postId",deletePost)

export default router;