import express from 'express'
import { addLike,getLikes,removeLike } from '../controllers/likes.js'

const router = express.Router();

router.post("/api/addLike",addLike);
router.get( "/api/getLikes/:postId",getLikes)
router.delete("/api/removeLike",removeLike)

export default router;