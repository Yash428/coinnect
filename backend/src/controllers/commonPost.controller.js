import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { connectDb } from "../db/index.js"

const createCommonPost = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();

    try {
        const { content } = req.body;
        const userId = req.user.id;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; // Cloudinary URL from multer
        }

        const post = await Post.create(
            { content, image: imageUrl, user_id: userId, community_id: null },
            { transaction }
        );

        await transaction.commit();
        return res.status(201).json(new ApiResponse(201, post, "Common post created successfully"));

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(400, error.message || "Error creating common post");
    }
});

// ✅ Fetch All Common Posts
const getAllCommonPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { community_id: null } });
        return res.status(200).json(new ApiResponse(200, posts, "Common posts fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching common posts");
    }
});


export{
    getAllCommonPosts,
    createCommonPost
}