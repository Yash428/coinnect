import { Router } from "express";
import {createCommonPost, getAllCommonPosts} from "../controllers/commonPost.controller.js";
import {likePost, dislikePost} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/addPost').post(verifyJWT, upload.single('image'), createCommonPost)
router.route('/getCommon').post(verifyJWT, getAllCommonPosts)
router.route('/like').post(verifyJWT, likePost)
router.route('/dislike').post(verifyJWT, dislikePost)

export default router;
