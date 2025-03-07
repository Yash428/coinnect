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

        // Add new comment
        const comment = await Comment.create(
            { content, user_id: userId, post_id: postId },
            { transaction }
        );

        // Fetch all comments for the post after adding new one
        const comments = await sequelize.query(
            `
            SELECT 
                comments.id AS comment_id,
                comments.content AS content,
                comments.created_at AS comment_created_at,
                users.id AS user_id,
                users.full_name AS user_name,
                users.profile_picture
            FROM comments
            LEFT JOIN users ON comments.user_id = users.id
            WHERE comments.post_id = :postId
            ORDER BY comments.created_at ASC;
            `,
            {
                type: sequelize.QueryTypes.SELECT,
                replacements: { postId },
                transaction
            }
        );

        await transaction.commit();

        return res.status(201).json(new ApiResponse(201, { newComment: comment, allComments: comments }, "Comment added successfully"));

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(400, error.message || "Error adding comment");
    }
});


const getCommentsForPost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.body;
        const sequelize = await connectDb();
    
        const query = `
            SELECT 
                comments.id AS comment_id,
                comments.content AS comment_content,
                comments.created_at AS comment_created_at,
    
                users.id AS user_id,
                users.full_name AS user_name,
                users.email AS user_email,
                users.profile_picture AS user_avatar
    
            FROM comments
            LEFT JOIN users ON comments.user_id = users.id
            WHERE comments.post_id = :postId
            ORDER BY comments.created_at ASC;
        `;
    
        const comments = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { postId }
        });
    
        return res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
    
    } catch (error) {
        console.error("❌ Error fetching comments:", error);
        throw new ApiError(500, "Error fetching comments");
    }    
});

export{
    addComment,
    getCommentsForPost
}