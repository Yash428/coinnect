import { Router } from "express";
import { 
    createCommunity, 
    getAllCommunities, 
    getCommunityById, 
    joinCommunity 
} from "../controllers/community.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Create a new community (protected route)
router.route("/create").post(verifyJWT, createCommunity);

// Get all communities
router.route("/getall").get(getAllCommunities);

// Get a specific community by ID
router.route("/get:id").get(getCommunityById);

// Join a community (protected route)
router.route("/join").post(verifyJWT, joinCommunity);

export default router;