import express from "express";
import {
  register,
  login,
  logout,
  loadUser,
  getAllBookmarks,
  removeBookmarkStory,
  addBookmarkStory,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Authenticated routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/load/:email", isAuthenticated, loadUser);

// Bookmark routes
router.get("/bookmarks/:userId", isAuthenticated, getAllBookmarks);
router.post("/bookmark/:id", isAuthenticated, addBookmarkStory);
router.post("/bookmark/:id", isAuthenticated, removeBookmarkStory);

export default router;
