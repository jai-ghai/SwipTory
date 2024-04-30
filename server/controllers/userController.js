import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import Story from "../models/Story.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User Already Exist", 409));
  }

  user = await User.create({ email, password });

  const token = user.getJWTToken(); // Generate JWT token

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user,
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(new ErrorHandler("Error logging out user"));
  }
});

export const loadUser = catchAsyncError(async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.json({ success: true, username: user.email, userId: user._id, user });
    } else {
      res.status(400).json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    next(new ErrorHandler("Error getting user"));
  }
});

// bookmarks
export const addBookmarkStory = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const { userId } = req.body;

    // Get user and story
    const [user, story] = await Promise.all([
      User.findById(userId),
      Story.findById(storyId),
    ]);

    // Return error if user or story not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Return error if story already bookmarked
    if (user.bookmarks.includes(storyId)) {
      return res
        .status(400)
        .json({ message: "Story already bookmarked", bookmarked: true });
    }

    // Add the story to the user's bookmarks
    user.bookmarks.push(storyId);
    await user.save();

    // Add the user to the story's bookmarks
    story.bookmarks.push(userId);
    await story.save();

    res.status(200).json({
      message: "Story bookmarked successfully",
      bookmarks: user.bookmarks,
      bookmarked: true,
      story,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error bookmarking story", error: error.message });
  }
};

export const getAllBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all stories bookmarked by user
    const bookmarks = await Story.find({ _id: { $in: user.bookmarks } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ bookmarks });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookmarks", error });
  }
};

export const removeBookmarkStory = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const { userId } = req.body;

    // Get user and story
    const [user, story] = await Promise.all([
      User.findById(userId),
      Story.findById(storyId),
    ]);

    // Return error if user or story not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Remove the story from the user's bookmarks
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== storyId
    );
    await user.save();

    // Remove the user from the story's bookmarks
    story.bookmarks = story.bookmarks.filter(
      (bookmark) => bookmark.toString() !== userId
    );
    await story.save();

    res.status(200).json({
      message: "Bookmark removed successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing bookmark", error });
  }
};
