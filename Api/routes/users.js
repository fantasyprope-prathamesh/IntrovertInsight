import express from 'express'
import {getUser, updateUser} from '../controllers/users.js'

const router = express.Router();

router.get("/api/getUser/:userId",getUser);
router.put('/api/user/updateUser',updateUser);

export default router;