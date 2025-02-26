import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { connectDb } from "../db/index.js"

const createCommunityPost = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();
    let img = null;
    try {
        const { content, community_id } = req.body;
        const userId = req.user.id;
        const community = await Community.findByPk(community_id);
        if (!community) {
            throw new ApiError(404, "Community not found");
        }

        if (req.file) {
            const imagePath =  req.file?.path;
            if(!imagePath){
                throw new ApiError(400,"Avatar file is required")
            }
            img = await uploadOnCloudinary(imagePath)
            if(!img){
                throw new ApiError(400,"Avatar file is required")
            }
        }

        const post = await Post.create(
            { content, image: img.url, user_id: userId, community_id },
            { transaction }
        );

        await transaction.commit();
        return res.status(201).json(new ApiResponse(201, post, "Community post created successfully"));

    } catch (error) {
        await transaction.rollback();
        if (img && img.public_id) {
            await deleteFromCloudinary(img.public_id);
        }
        throw new ApiError(400, error.message || "Error creating community post");
    }
});

const getPostsByCommunity = asyncHandler(async (req, res) => {
    try {
        const { communityId } = req.params;

        const community = await Community.findByPk(communityId);
        if (!community) {
            throw new ApiError(404, "Community not found");
        }

        const posts = await Post.findAll({ where: { community_id: communityId } });
        return res.status(200).json(new ApiResponse(200, posts, "Community posts fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching community posts");
    }
});

export {
    createCommunityPost,
    getPostsByCommunity
}