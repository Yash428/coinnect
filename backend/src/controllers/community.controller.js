import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Community } from "../models/community.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { connectDb } from "../db/index.js"


const createCommunity = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const transaction = await sequelize.transaction();
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        const community = await Community.create({ 
            name, 
            description, 
            created_by: userId 
        },{
            transaction
        });

        await transaction.commit();
        return res
        .status(201)
        .json(new ApiResponse(201, community, "User registered successfully"));

    } catch (error) {
        await transaction.rollback();
        throw new ApiError(400,error || "Error creating Community");
    }
})

const getAllCommunities = asyncHandler(async (req, res) => {
    try {
        const communities = await Community.findAll();
        return res.status(200).json(new ApiResponse(200, communities, "Communities fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching communities");
    }
});

const getCommunityById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const community = await Community.findByPk(id);
        if (!community) {
            throw new ApiError(404, "Community not found");
        }
        return res.status(200).json(new ApiResponse(200, community, "Community fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching community");
    }
});

export{
    createCommunity,
    getAllCommunities,
    getCommunityById,
}