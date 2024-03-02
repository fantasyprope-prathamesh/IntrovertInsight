import express from "express";
import { follow,unfollow,details } from "../controllers/relationships.js";
const router = express.Router();

router.post("/api/relation/follow", follow);
router.post("/api/relation/unfollow", unfollow);
router.post("/api/relation/followDetails",details);

export default router;
