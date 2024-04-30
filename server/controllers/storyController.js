import User from "../models/User.js";
import Story from "../models/Story.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;
    if (!slides || !addedBy) {
      return res.status(400).json("Please provide all the required fields");
    }
    const story = new Story({ slides, addedBy });
    await story.save();
    res.status(201).json({ success: true, story });
  } catch (error) {
    next(new Error("Error creating story"));
  }
};

export const getStories = async (req, res, next) => {
  const categories = [
    "food",
    "health and fitness",
    "travel",
    "movie",
    "education",
  ];
  const { userId, category, catLimit, cat } = req.query;

  let page = parseInt(req.query.page) || 1;
  let limit = 4 * page;
  let skip = 0;

  try {
    let stories = [];

    if (userId) {
      stories = await Story.find({ addedBy: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else if (category && category.toLowerCase() === "all") {
      const groupedStories = {};

      for (const c of categories) {
        const categoryStories = await Story.find({
          slides: { $elemMatch: { category: c } },
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(cat === c ? catLimit : 4);

        groupedStories[c] = categoryStories;
      }

      return res
        .status(200)
        .json({ success: true, stories: groupedStories, page });
    } else {
      stories = await Story.find({
        slides: { $elemMatch: { category: category } },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.status(200).json({ success: true, stories, page });
    }

    res.status(200).json({ success: true, stories, page });
  } catch (error) {
    next(new Error("Error getting stories"));
  }
};

export const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { userId } = req.query;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    let totalLikes = story.likes.length;

    if (userId) {
      const user = await User.findById(userId);

      if (user) {
        const liked = user.likes.includes(storyId);
        const bookmarked = user.bookmarks.includes(storyId);

        return res.status(200).json({
          success: true,
          story,
          liked,
          bookmarked,
          totalLikes,
        });
      }
    } else {
      return res.status(200).json({ success: true, story, totalLikes });
    }
  } catch (error) {
    next(new Error("Error getting story"));
  }
};

export const updateStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;

    if (!slides || !addedBy) {
      return res.status(400).json("Please provide all the required fields");
    }
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    story.slides = slides;
    story.addedBy = addedBy;
    await story.save();
    res.status(200).json({ success: true, story });
  } catch (error) {
    next(new Error("Error updating story"));
  }
};

// like story
export const likeStory = async (req, res) => {
  const { id: storyId } = req.params;
  const { userId } = req.body;

  try {
    const [story, user] = await Promise.all([
      Story.findById(storyId),
      User.findById(userId),
    ]);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already liked the story
    if (user.likes.includes(storyId)) {
      return res.status(400).json({
        message: "You have already liked this story",
        liked: true,
        story,
      });
    }

    // Save the user id to the story's likes array
    story.likes.push(userId);
    await story.save();

    // Save the story id to the user's likes array
    user.likes.push(storyId);
    await user.save();

    story.totalLikes = story.likes.length;
    res.json({
      message: "Story liked successfully",
      totalLikes: story.totalLikes,
      story,
      liked: true,
      likes: story.likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
