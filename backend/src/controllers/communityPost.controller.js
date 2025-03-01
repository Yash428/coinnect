// import {ApiError} from "../utils/ApiError.js"
// import {ApiResponse} from "../utils/ApiResponse.js"
// import {asyncHandler} from "../utils/asyncHandler.js"
// import { User } from "../models/user.model.js"
// import { Community } from "../models/community.model.js"
// import { Post} from "../models/post.model.js"
// import { connectDb } from "../db/index.js"

// const createCommunityPost = asyncHandler(async (req, res) => {
//     const sequelize = await connectDb();
//     const transaction = await sequelize.transaction();
//     let img = null;
//     try {
//         const { content, community_id } = req.body;
//         const userId = req.user.id;
//         const community = await Community.findByPk(community_id);
//         if (!community) {
//             throw new ApiError(404, "Community not found");
//         }

//         if (req.file) {
//             const imagePath =  req.file?.path;
//             if(!imagePath){
//                 throw new ApiError(400,"Avatar file is required")
//             }
//             img = await uploadOnCloudinary(imagePath)
//             if(!img){
//                 throw new ApiError(400,"Avatar file is required")
//             }
//         }

//         const post = await Post.create(
//             { content, image: img.url, user_id: userId, community_id },
//             { transaction }
//         );

//         await transaction.commit();
//         return res.status(201).json(new ApiResponse(201, post, "Community post created successfully"));

//     } catch (error) {
//         await transaction.rollback();
//         if (img && img.public_id) {
//             await deleteFromCloudinary(img.public_id);
//         }
//         throw new ApiError(400, error.message || "Error creating community post");
//     }
// });

// const getPostsByCommunity = asyncHandler(async (req, res) => {
//     try {
//         const { communityId } = req.params;

//         const community = await Community.findByPk(communityId);
//         if (!community) {
//             throw new ApiError(404, "Community not found");
//         }

//         const posts = await Post.findAll({ where: { community_id: communityId } });
//         return res.status(200).json(new ApiResponse(200, posts, "Community posts fetched successfully"));
//     } catch (error) {
//         throw new ApiError(500, "Error fetching community posts");
//     }
// });

// export {
//     createCommunityPost,
//     getPostsByCommunity
// }

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Community } from "../models/community.model.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { connectDb } from "../db/index.js";
import { QueryTypes } from "sequelize";

// ✅ Create a post in a specific community
const createCommunityPost = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();
    let img = null;

    try {
        const { content, community_id } = req.body;
        console.log(community_id);
        
        const userId = req.user.id;

        // Validate community existence
        const community = await Community.findByPk(community_id);
        if (!community) {
            throw new ApiError(404, "Community not found");
        }
        console.log(community.created_by);
        console.log("pq");
        if(community.created_by !== userId){
            throw new ApiError(403, "You are not authorized to create a post in this community");
        }
        // Handle image upload
        const imgLocalPath = req.file?.path;
        if (imgLocalPath) {
            img = await uploadOnCloudinary(imgLocalPath);
            if (!img) {
                throw new ApiError(400, "Image upload failed");
            }
        }

        const post = await Post.create(
            { content, image: img?.url, user_id: userId, community_id },
            { transaction }
        );

        await transaction.commit();
        return res.status(201).json(new ApiResponse(201, post, "Community post created successfully"));

    } catch (error) {
        await transaction.rollback();
        if (img && img.public_id) {
            await deleteFromCloudinary(img.public_id);
        }
        console.log(error);
        
        throw new ApiError(400, error.message || "Error creating community post");
    }
});

// ✅ Fetch all posts from a specific community
const getAllCommunityPosts = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const { community_id } = req.body;
    const userId = req.user.id;

    try {
        // Validate community existence
        const community = await Community.findByPk(community_id);
        if (!community) {
            throw new ApiError(404, "Community not found");
        }

        const query = `
            SELECT 
                posts.id AS post_id,
                posts.content AS post_content,
                posts.image AS post_image,
                posts.user_id AS post_user_id,
                posts.community_id,
                posts.created_at AS post_created_at,
                posts.updated_at AS post_updated_at,

                users.id AS user_id,
                users.full_name AS user_name,
                users.email AS user_email,
                users.profile_picture AS user_avatar,

                comments.id AS comment_id,
                comments.content AS comment_content,
                comments.created_at AS comment_created_at,

                CAST(COALESCE(likes_count_table.likes_count, 0) AS INTEGER) AS likes_count,

                CASE WHEN user_likes.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS liked,
                CASE WHEN user_dislikes.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS disliked

            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
            LEFT JOIN comments ON comments.post_id = posts.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS likes_count FROM likes GROUP BY post_id
            ) AS likes_count_table ON posts.id = likes_count_table.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS dislikes_count FROM post_dislikes GROUP BY post_id
            ) AS dislikes_count_table ON posts.id = dislikes_count_table.post_id
            LEFT JOIN likes AS user_likes ON posts.id = user_likes.post_id AND user_likes.user_id = :userId
            LEFT JOIN post_dislikes AS user_dislikes ON posts.id = user_dislikes.post_id AND user_dislikes.user_id = :userId

            WHERE posts.community_id = :community_id
            ORDER BY posts.created_at DESC, comments.created_at ASC;
        `;

        const rows = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { userId, community_id },
        });

        if (!rows.length) {
            return res.status(200).json(new ApiResponse(200, [], "No posts found in this community"));
        }

        // Convert flat results into structured JSON format
        const postsMap = new Map();

        rows.forEach(row => {
            if (!postsMap.has(row.post_id)) {
                postsMap.set(row.post_id, {
                    post_id: row.post_id,
                    content: row.post_content,
                    image: row.post_image,
                    user_id: row.post_user_id,
                    community_id: row.community_id,
                    created_at: row.post_created_at,
                    updated_at: row.post_updated_at,
                    likes: row.likes_count,
                    disliked: row.disliked,
                    liked: row.liked,
                    user: {
                        id: row.user_id,
                        name: row.user_name,
                        email: row.user_email,
                        avatar: row.user_avatar
                    },
                    comments: []
                });
            }

            if (row.comment_id) {
                postsMap.get(row.post_id).comments.push({
                    id: row.comment_id,
                    content: row.comment_content,
                    created_at: row.comment_created_at
                });
            }
        });

        const formattedPosts = Array.from(postsMap.values());
        return res.status(200).json(new ApiResponse(200, formattedPosts, "Community posts fetched successfully"));

    } catch (error) {
        console.error("❌ Error fetching community posts:", error);
        return res.status(500).json({ status: 500, message: "Error fetching community posts" });
    }
});

// ✅ Fetch a specific post from a community
const getCommunityPostById = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const userId = req.user.id;
    const { postId } = req.body;

    try {
        const query = `
            SELECT 
                posts.id AS post_id,
                posts.content AS post_content,
                posts.image AS post_image,
                posts.user_id AS post_user_id,
                posts.community_id,
                posts.created_at AS post_created_at,
                posts.updated_at AS post_updated_at,

                users.id AS user_id,
                users.full_name AS user_name,
                users.email AS user_email,
                users.profile_picture AS user_avatar,

                comments.id AS comment_id,
                comments.content AS comment_content,
                comments.created_at AS comment_created_at,

                CAST(COALESCE(likes_count_table.likes_count, 0) AS INTEGER) AS likes_count,

                CASE WHEN user_likes.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS liked

            FROM posts
            LEFT JOIN users ON posts.user_id = users.id
            LEFT JOIN comments ON comments.post_id = posts.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS likes_count FROM likes GROUP BY post_id
            ) AS likes_count_table ON posts.id = likes_count_table.post_id
            LEFT JOIN likes AS user_likes ON posts.id = user_likes.post_id AND user_likes.user_id = :userId

            WHERE posts.id = :postId
            ORDER BY comments.created_at ASC;
        `;

        const rows = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: { userId, postId },
        });

        if (!rows.length) {
            return res.status(404).json(new ApiResponse(404, null, "Post not found"));
        }

        // Convert results into structured format
        const postData = {
            post_id: Number(rows[0].post_id),
            content: rows[0].post_content,
            image: rows[0].post_image,
            user_id: rows[0].post_user_id,
            community_id: rows[0].community_id,
            created_at: rows[0].post_created_at,
            updated_at: rows[0].post_updated_at,
            likes: Number(rows[0].likes_count),
            liked: rows[0].liked,
            user: {
                id: rows[0].user_id,
                name: rows[0].user_name,
                email: rows[0].user_email,
                avatar: rows[0].user_avatar
            },
            comments: rows.map(row => row.comment_id ? ({
                id: row.comment_id,
                content: row.comment_content,
                created_at: row.comment_created_at
            }) : []).filter(Boolean)
        };

        return res.status(200).json(new ApiResponse(200, postData, "Post fetched successfully"));

    } catch (error) {
        console.error("❌ Error fetching post by ID:", error);
        return res.status(500).json({ status: 500, message: "Error fetching post" });
    }
});

export { createCommunityPost, getAllCommunityPosts, getCommunityPostById };
