import express from 'express'
import {getUser, updateUser, fetchUsers} from '../controllers/users.js'

const router = express.Router();

router.get("/api/getUser/:userId",getUser);
router.put('/api/user/updateUser',updateUser);
router.get("/api/fetchUsers/:value", fetchUsers)

export default router;