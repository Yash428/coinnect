import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { connectDb } from "../db/index.js"
import { PostDislike } from "../models/post_dislike.model.js"
import {Like} from "../models/like.model.js"


const likePost = asyncHandler(async (req, res) => {
    let { postId } = req.body;
    const userId = req.user.id; // Ensure user is authenticated
    postId = Number(postId);

    try {
        if (!postId || isNaN(postId)) {
            throw new ApiError(400, "Invalid post ID");
        }

        const existingLike = await Like.findOne({ where: { user_id: userId, post_id: postId } });

        if (existingLike) {
            // Remove Like & Deduct Coin
            await Like.destroy({ where: { user_id: userId, post_id: postId } });
            await User.increment("coins", { by: -1, where: { id: userId } });

            // Get updated like and dislike count
            const likeCount = await Like.count({ where: { post_id: postId } });
            const dislikeCount = await PostDislike.count({ where: { post_id: postId } });

            return res.status(200).json(
                new ApiResponse(200, { likes: likeCount, dislikes: dislikeCount, liked: false }, "Like removed, 1 coin deducted.")
            );
        }

        // Remove Dislike if it exists
        const existingDislike = await PostDislike.findOne({ where: { user_id: userId, post_id: postId } });
        if (existingDislike) {
            await PostDislike.destroy({ where: { user_id: userId, post_id: postId } });
            await User.increment("coins", { by: 1, where: { id: userId } }); // Revert dislike effect
        }

        // Add Like & Reward Coin
        await Like.create({ user_id: userId, post_id: postId });
        await User.increment("coins", { by: 1, where: { id: userId } });

        // Get updated like and dislike count
        const likeCount = await Like.count({ where: { post_id: postId } });
        const dislikeCount = await PostDislike.count({ where: { post_id: postId } });

        return res.status(200).json(
            new ApiResponse(200, { likes: likeCount, dislikes: dislikeCount, liked: true }, "Post liked, 1 coin added!")
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error liking post");
    }
});

const dislikePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id; // Ensure user is authenticated

    if (!postId || isNaN(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    // Check if user already disliked the post
    const existingDislike = await PostDislike.findOne({ where: { user_id: userId, post_id: postId } });

    if (existingDislike) {
        // Remove Dislike & Restore Coin
        await PostDislike.destroy({ where: { user_id: userId, post_id: postId } });
        await User.increment("coins", { by: 1, where: { id: userId } });

        // Get updated like and dislike count
        const likeCount = await Like.count({ where: { post_id: postId } });
        const dislikeCount = await PostDislike.count({ where: { post_id: postId } });

        return res.status(200).json(
            new ApiResponse(200, { likes: likeCount, dislikes: dislikeCount, disliked: false }, "Dislike removed, 1 coin restored.")
        );
    }

    // Check if user liked the post (remove if exists)
    const existingLike = await Like.findOne({ where: { user_id: userId, post_id: postId } });
    if (existingLike) {
        await Like.destroy({ where: { user_id: userId, post_id: postId } });
        await User.increment("coins", { by: -1, where: { id: userId } }); // Revert like effect
    }

    // Add Dislike & Deduct Coin
    await PostDislike.create({ user_id: userId, post_id: postId });
    await User.increment("coins", { by: -1, where: { id: userId } });

    // Get updated like and dislike count
    const likeCount = await Like.count({ where: { post_id: postId } });
    const dislikeCount = await PostDislike.count({ where: { post_id: postId } });

    return res.status(200).json(
        new ApiResponse(200, { likes: likeCount, dislikes: dislikeCount, disliked: true }, "Post disliked, 1 coin deducted!")
    );
});



export { likePost, dislikePost };