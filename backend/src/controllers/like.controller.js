import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { connectDb } from "../db/index.js"

const toggleLike = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();

    try {
        const { postId } = req.body;
        const userId = req.user.id;

        const post = await Post.findByPk(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        if (post.user_id === userId) {
            throw new ApiError(400, "You cannot like your own post");
        }

        const existingLike = await Like.findOne({ where: { user_id: userId, post_id: postId } });

        if (existingLike) {
            // Unlike the post
            await existingLike.destroy({ transaction });
            await post.decrement("likes_count", { transaction });
            await User.decrement("coins", { where: { id: post.user_id }, transaction });

            await transaction.commit();
            return res.status(200).json(new ApiResponse(200, {}, "Like removed"));
        } else {
            // Like the post
            await Like.create({ user_id: userId, post_id: postId }, { transaction });
            await post.increment("likes_count", { transaction });
            await User.increment("coins", { where: { id: post.user_id }, transaction });

            await transaction.commit();
            return res.status(200).json(new ApiResponse(200, {}, "Post liked"));
        }
    } catch (error) {
        await transaction.rollback();
        throw new ApiError(500, error.message || "Error toggling like");
    }
});

// ✅ Get Likes Count for a Post
const getLikesForPost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const likesCount = await Like.count({ where: { post_id: postId } });
        return res.status(200).json(new ApiResponse(200, { likesCount }, "Likes count fetched"));
    } catch (error) {
        throw new ApiError(500, "Error fetching likes count");
    }
});

export{
    toggleLike,
    getLikesForPost
}