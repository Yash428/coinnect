import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { Comment } from "../models/comment.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { connectDb } from "../db/index.js"

const addComment = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();

    try {
        const { postId, content } = req.body;
        const userId = req.user.id;

        const post = await Post.findByPk(postId);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        const comment = await Comment.create(
            { content, user_id: userId, post_id: postId },
            { transaction }
        );

        await transaction.commit();
        return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(400, error.message || "Error adding comment");
    }
});

const getCommentsForPost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({
            where: { post_id: postId },
            include: [{ model: User, attributes: ["id", "email"] }] // Include user details
        });

        return res.status(200).json(new ApiResponse(200, comments, "Comments fetched"));
    } catch (error) {
        throw new ApiError(500, "Error fetching comments");
    }
});

export{
    addComment,
    getCommentsForPost
}