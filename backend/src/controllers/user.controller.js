import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import bcrypt from "bcrypt"
import { connectDb } from "../db/index.js"
import { Session } from "../models/session.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"

const registerUser = asyncHandler(async (req, res) => {
    const sequelize = await connectDb()
    const transaction = await sequelize.transaction();
    // let avatar = null;
    try {
        const { full_name, email, password, dob, gender } = req.body;
        // console.log(req.body);
        
        if ([full_name, email, password, dob, gender].some((field) => !field?.trim())) {
            throw new ApiError(400, "All fields are required");
        }
    
        const existedUser = await User.findOne({ where: { email }, transaction });
        if (existedUser) {
            throw new ApiError(409, "User already exists");
        }
        
        // const avatarLocalPath =  req.file?.path;
        // if(!avatarLocalPath){
        //     throw new ApiError(400,"Avatar file is required")
        // }
        // avatar = await uploadOnCloudinary(avatarLocalPath)
        // if(!avatar){
        //     throw new ApiError(400,"Avatar file is required")
        // }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            full_name,
            // profile_picture: avatar.url,
            email,
            password_hash: hashedPassword,
            signup_method: "normal",
            dob,
            gender
        },{
            transaction
        });
    
        const sessionToken = jwt.sign({ 
            id: user.id,
            email: user.email 
            },
            process.env.REFRESH_TOKEN_SECRET,{ 
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
            }
        );
        
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 15);

        await Session.create(
            {
                user_id: user.id,
                refresh_token: sessionToken,
                expires_at: expiresAt,
            },
            { transaction }
        );

        await transaction.commit();
        console.log("New user created successfully");
        
        return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
    } catch (error) {
        await transaction.rollback();
        // if (avatar && avatar.public_id) {
        //     await deleteFromCloudinary(avatar.public_id);
        // }
        throw new ApiError(500, error || "Internal server error");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate Access Token
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    // Generate Session Token (Refresh Token)
    const sessionToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" } // 7 days validity
    );

    // Calculate expiration date for session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    // console.log(user);
    
    // Store session token in database
    await Session.create({
        user_id: user.id,
        refresh_token: sessionToken,
        expires_at: expiresAt,
    });

    
    const options = {
        httpOnly:true,
        secure: true
    }

    res.cookie("sessionToken", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",sessionToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user,accessToken,sessionToken
            },
            "user logged in successfully"
        )
    )

    
});

const logoutUser = asyncHandler(async (req, res) => {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken) {
        return res.status(204).send(); // No content, user already logged out
    }

    // Remove session token from database
    await Session.destroy({ where: { refresh_token: sessionToken } });

    // Clear cookie
    res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

// const forgetPassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     if (!email) {
//         throw new ApiError(400, "Email is required");
//     }
//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             throw new ApiError(404, "User not found");
//         }

//         // Generate reset token (valid for 15 minutes)
//         const resetToken = crypto.randomBytes(32).toString("hex");
//         const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//         const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

//     // Store token in sessions table
//         await Session.create({
//             user_id: user.id,
//             refresh_token: hashedToken,
//             expires_at: expiresAt,
//         });

//         // Send email with reset link
//         const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Password Reset Request",
//             text: `Click the following link to reset your password: ${resetLink}`,
//         });

//         return res.status(200).json(new ApiResponse(200, {}, "Reset password link sent"));
//     } catch (error) {
//         console.log(error);
        
//         throw new ApiError(404, "Prolem")
//     }
    
// });

const updateUserAvatar = asyncHandler(async (req, res) => {
    let avatar = null
    const sequelize = await connectDb()
    const transaction = await sequelize.transaction();
    try {
        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is missing");
        }

        avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar?.url) {
            throw new ApiError(400, "Error while uploading avatar");
        }

        const user = await User.findByPk(req.user?.id, {
            transaction
        });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        await user.update({ avatar: avatar.url },{
            transaction
        });
        await transaction.commit();
        return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));
    } catch (error) {
        if (avatar && avatar.public_id) {
            await deleteFromCloudinary(avatar.public_id);
        }
        await transaction.rollback();
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const resetPassword = asyncHandler(async(req,res)=>{
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id;
    const sequelize = await connectDb()
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.findByPk(userId, { transaction });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password_hash);
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid old password");
        }

        user.password_hash = await bcrypt.hash(newPassword, 10)
        
        await user.save({ validateBeforeSave: false, transaction });
        await transaction.commit();
        return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
    } catch (error) {
        await transaction.rollback();
        throw new ApiError(500, error.message || "Internal Server Error");
    }
})

export{
    registerUser,
    loginUser,
    logoutUser,
    updateUserAvatar,
    resetPassword
    // forgetPassword
}
