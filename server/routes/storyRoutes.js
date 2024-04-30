import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createStory,
  getStories,
  getStoryById,
  updateStory,
  likeStory,
} from "../controllers/storyController.js";

const router = express.Router();

// Routes
router.get("/getAll", getStories);
router.get("/getById/:storyId", getStoryById);
router.post("/create", isAuthenticated, createStory);
router.put("/update/:id", isAuthenticated, updateStory);
router.put("/like/:id", isAuthenticated, likeStory);

export default router;
