import express from 'express'
import { addComment } from '../controllers/comments.js'

const router = express.Router();

router.post("/api/addComment",addComment);

export default router;