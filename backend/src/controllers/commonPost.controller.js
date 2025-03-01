import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { Post} from "../models/post.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { connectDb } from "../db/index.js"
import {QueryTypes } from "sequelize"

const createCommonPost = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const transaction = await sequelize.transaction();
    let img = null
    try {
        const { content } = req.body;
        const userId = req.user.id;

        const imgLocalPath =  req.file?.path;
        if(imgLocalPath){
            img = await uploadOnCloudinary(imgLocalPath)
            if(!img){
                throw new ApiError(400,"Avatar file is required")
            }
        }
        
        const post = await Post.create(
            { content, image: img?.url, user_id: userId, community_id: null },
            { transaction }
        );

        await transaction.commit();
        return res.status(201).json(new ApiResponse(201, post, "Common post created successfully"));

    } catch (error) {
        await transaction.rollback();
        if (img && img.public_id) {
            await deleteFromCloudinary(img.public_id);
        }
        throw new ApiError(400, error.message || "Error creating common post");
    }
});


// const getAllCommonPosts = asyncHandler(async (req, res) => {
//     try {
//         const sequelize = await connectDb();
//         const query = `
//             SELECT 
//                 posts.id AS post_id,
//                 posts.content,
//                 posts.image,
//                 posts.user_id,
//                 posts.community_id,
//                 posts.likes_count,
//                 posts.created_at,
//                 posts.updated_at,
//                 users.id AS user_id,
//                 users.full_name,
//                 users.email,
//                 users.profile_picture as avatar
//             FROM posts
//             LEFT JOIN users ON posts.user_id = users.id
//             WHERE posts.community_id IS NULL;
//         `;
//         const posts = await sequelize.query(query, {
//             type: QueryTypes.SELECT,
//         });

//         console.log(posts);

//         return res.status(200).json(new ApiResponse(200, posts, "Common posts fetched successfully"));
//     } catch (error) {
//         console.log(error);
//         throw new ApiError(500, "Error fetching common posts");
//     }    
// });

/*m*/

// const getAllCommonPosts = async (req, res) => {
    
//     const sequelize = await connectDb();
//     try {
//         const query = `
//             SELECT 
//     posts.id AS post_id,
//     posts.content AS post_content,
//     posts.image AS post_image,
//     posts.user_id AS post_user_id,
//     posts.community_id,
//     posts.likes_count,
//     posts.created_at AS post_created_at,
//     posts.updated_at AS post_updated_at,

//     users.id AS user_id,
//     users.full_name AS user_name,
//     users.email AS user_email,
//     users.profile_picture AS user_avatar,

//     comments.id AS comment_id,
//     comments.content AS comment_content,
//     comments.created_at AS comment_created_at

// FROM posts
// LEFT JOIN users ON posts.user_id = users.id
// LEFT JOIN comments ON comments.post_id = posts.id
// WHERE posts.community_id IS NULL
// ORDER BY posts.created_at DESC, comments.created_at ASC;
//         `;

//         const rows = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
//         // console.log(rows);
        
//         // ✅ Transform the flat query result into a nested JSON format
//         const postsMap = new Map();

//         rows.forEach(row => {
//             if (!postsMap.has(row.post_id)) {
//                 postsMap.set(row.post_id, {
//                     post_id: row.post_id,
//                     content: row.post_content,
//                     image: row.post_image,
//                     user_id: row.post_user_id,
//                     community_id: row.community_id,
//                     likes_count: row.likes_count,
//                     created_at: row.post_created_at,
//                     updated_at: row.post_updated_at,
//                     user: {
//                         id: row.user_id,
//                         name: row.user_name,
//                         email: row.user_email,
//                         avatar: row.user_avatar
//                     },
//                     comments: [] // Initialize empty comments array
//                 });
//             }

//             // If a comment exists, push it into the array
//             if (row.comment_id) {
//                 postsMap.get(row.post_id).comments.push({
//                     id: row.comment_id,
//                     content: row.comment_content,
//                     created_at: row.comment_created_at
//                 });
//             }
//         });

//         const formattedPosts = Array.from(postsMap.values());
//         console.log(formattedPosts);
        
//         return res.status(200).json({
//             status: 200,
//             data: formattedPosts,
//             message: "Common posts with comments fetched successfully",
//         });
//     } catch (error) {
//         console.error("❌ Error fetching posts:", error);
//         return res.status(500).json({ status: 500, message: "Error fetching common posts" });
//     }
// };

const getAllCommonPosts = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const userId = req.user.id; // Get the authenticated user ID

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

                -- Check if the current user has liked this post
                CASE WHEN user_likes.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS liked,

                -- Check if the current user has disliked this post
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

            WHERE posts.community_id IS NULL
            ORDER BY posts.created_at DESC, comments.created_at ASC;
        `;

        const rows = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { userId },
        });

        if (!rows.length) {
            return res.status(200).json(new ApiResponse(200, [], "No common posts found"));
        }

        // ✅ Convert results into a structured format
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
                    dislikes: row.dislikes_count,
                    liked: row.liked,  // New Field
                    disliked: row.disliked,  // New Field
                    user: {
                        id: row.user_id,
                        name: row.user_name,
                        email: row.user_email,
                        avatar: row.user_avatar
                    },
                    comments: [] // Initialize empty comments array
                });
            }

            // If a comment exists, push it into the array
            if (row.comment_id) {
                postsMap.get(row.post_id).comments.push({
                    id: row.comment_id,
                    content: row.comment_content,
                    created_at: row.comment_created_at
                });
            }
        });

        const formattedPosts = Array.from(postsMap.values());
        console.log("pppp");
        
        console.log(formattedPosts);
        
        return res.status(200).json(new ApiResponse(200, formattedPosts, "Common posts fetched successfully"));

    } catch (error) {
        console.error("❌ Error fetching posts:", error);
        return res.status(500).json({ status: 500, message: "Error fetching common posts" });
    }
});

const getPostById = asyncHandler(async (req, res) => {
    const sequelize = await connectDb();
    const userId = req.user.id; // Get authenticated user ID
    const {postId} = req.body; // Extract post ID from request params

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

                -- Check if the current user has liked this post
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
            type: sequelize.QueryTypes.SELECT,
            replacements: { userId, postId },
        });

        if (!rows.length) {
            return res.status(404).json(new ApiResponse(404, null, "Post not found"));
        }

        // ✅ Convert results into a structured format
        const postData = {
            post_id: Number(rows[0].post_id),
            content: rows[0].post_content,
            image: rows[0].post_image,
            user_id: rows[0].post_user_id,
            community_id: rows[0].community_id,
            created_at: rows[0].post_created_at,
            updated_at: rows[0].post_updated_at,
            likes: Number(rows[0].likes_count),
            liked: rows[0].liked,  // User-specific like status
            user: {
                id: rows[0].user_id,
                name: rows[0].user_name,
                email: rows[0].user_email,
                avatar: rows[0].user_avatar
            },
            comments: [] // Initialize empty comments array
        };

        rows.forEach(row => {
            console.log(row);
            
            if (row.comment_id) {
                postData.comments.push({
                    id: row.comment_id,
                    content: row.comment_content,
                    created_at: row.comment_created_at,
                    created_by: row.user_name,
                    avatar: row.user_avatar
                });
            }
        });

        console.log(postData);
        
        return res.status(200).json(new ApiResponse(200, postData, "Post fetched successfully"));

    } catch (error) {
        console.error("❌ Error fetching post by ID:", error);
        return res.status(500).json({ status: 500, message: "Error fetching post" });
    }
});


export{
    getAllCommonPosts,
    createCommonPost,
    getPostById
}