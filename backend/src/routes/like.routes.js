import { Router } from "express";
import {likePost, dislikePost} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/l/:post_id").post(verifyJWT, likePost);
router.route("/d/:post_id").post(verifyJWT, dislikePost);

export default router;
