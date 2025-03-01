import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Like } from "../models/like.model.js";

const likePost = asyncHandler(async (req, res) => {
    let { postId } = req.body;
    const userId = req.user.id;
    postId = Number(postId);

    if (!postId || isNaN(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ where: { user_id: userId, post_id: postId } });

    if (existingLike) {
        // Remove the like
        await Like.destroy({ where: { user_id: userId, post_id: postId } });
        await User.increment("coins", { by: -1, where: { id: userId } });

        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Like removed, 1 coin deducted.")
        );
    }

    // Add a like
    await Like.create({ user_id: userId, post_id: postId });
    await User.increment("coins", { by: 1, where: { id: userId } });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Post liked, 1 coin added!")
    );
});

export { likePost };