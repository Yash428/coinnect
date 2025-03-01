import { Router } from "express";
import {createCommonPost, getAllCommonPosts, getPostById} from "../controllers/commonPost.controller.js";
import {likePost} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addComment, getCommentsForPost } from "../controllers/comment.controller.js";
import { moderate } from "../controllers/moderator.controller.js";

const router = Router();

router.route('/addPost').post(verifyJWT, upload.single('image'), createCommonPost)
router.route('/getCommon').post(verifyJWT, getAllCommonPosts)
router.route('/like').post(verifyJWT, likePost)
router.route('/getPostById').post(verifyJWT, getPostById)

router.route('/addComment').post(verifyJWT, addComment)
router.route("/getCommentsFromPost").post(verifyJWT,getCommentsForPost)

router.route("/moderateContent").post(verifyJWT, moderate)

export default router;
