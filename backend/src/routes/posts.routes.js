import { Router } from "express";
import {createCommonPost, getAllCommonPosts, getPostById} from "../controllers/commonPost.controller.js";
import {likePost} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addComment } from "../controllers/comment.controller.js";

const router = Router();

router.route('/addPost').post(verifyJWT, upload.single('image'), createCommonPost)
router.route('/getCommon').post(verifyJWT, getAllCommonPosts)
router.route('/like').post(verifyJWT, likePost)
router.route('/getPostById').post(verifyJWT, getPostById)

router.route('/addComment').post(verifyJWT, addComment)


export default router;
