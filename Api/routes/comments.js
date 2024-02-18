import express from 'express'
import { addComment, getComments } from '../controllers/comments.js'

const router = express.Router();

router.post("/api/addComment",addComment);
router.get("/api/getComments/:postId",getComments);

export default router;