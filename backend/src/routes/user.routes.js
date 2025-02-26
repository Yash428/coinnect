import { Router } from "express";
import { loginUser, registerUser, logoutUser, updateUserAvatar, resetPassword} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/updateProfile").post(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/resetPassword").post(verifyJWT, resetPassword);
// router.route("/forgotPassword").post(verifyJWT, forgetPassword);

export default router;