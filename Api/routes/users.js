import express from 'express'
import {getUser} from '../controllers/users.js'

const router = express.Router();

router.get("/api/getUser/:userId",getUser);

export default router;