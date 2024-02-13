import express from 'express'
import { getPosts, addPost } from '../controllers/posts.js'

const router = express.Router();

router.get("/api/posts",getPosts);
router.post("/api/addPost",addPost)

export default router;