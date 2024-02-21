import express from 'express'
import { addLike,getLikes } from '../controllers/likes.js'

const router = express.Router();

router.post("/api/addLike",addLike);
router.get( "/api/getLikes",getLikes)

export default router;