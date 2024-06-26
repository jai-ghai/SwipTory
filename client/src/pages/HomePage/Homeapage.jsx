import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../../components/Story/Categories/Categories.jsx";
import Stories from "../../components/Story/StoryList/StoryList.jsx";
import {
  getStoriesByCategory,
  getStories,
  getStoriesByUser,
} from "../../redux/actions/story.js";
import { categories } from "../../contants.js";
import Loader from "../../components/Loader/Loader.jsx";
import { endRequest } from "../../redux/reducers/storyReducer.js";

const Home = () => {
  const dispatch = useDispatch();
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("All");
  const {
    storiesLoading,
    categoryLoading,
    newStory,
    userStories,
    userStoriesPage,
    newLike,
  } = useSelector((state) => state.story);

  useEffect(() => {
    if (category !== "All") {
      dispatch(getStoriesByCategory(category, 1));
    } else {
      dispatch(getStories(1));
    }
  }, [category]);

  useEffect(() => {
    if (newStory) {
      dispatch(getStories(1));
      dispatch(getStoriesByUser(userId, userStoriesPage));
      dispatch(endRequest());
    }
  }, [newStory, userId, userStoriesPage]);

  useEffect(() => {
    if (newLike) {
      dispatch(endRequest());
    }
  }, [newLike]);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <>
      <Categories
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={category}
      />
      {!storiesLoading && <Stories category={category} />}
      {(storiesLoading || categoryLoading) && <Loader />}
    </>
  );
};

export default Home;
