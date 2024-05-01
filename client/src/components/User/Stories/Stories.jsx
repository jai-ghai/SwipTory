import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStoriesByUser } from "../../story/storyAPI";
import Loader from "../../common/Loader/Loader";
import Story from "../../story/StoryCard/StoryCard";
import Button from "../../common/Button/Button";
import styles from "./Stories.module.css";

const Stories = () => {
  const navigate = useNavigate();
  const { userStories, storiesLoading } = useSelector((state) => state.story);
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesByUser(userId));
  }, []);

  if (!isAuthenticated || storiesLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.storiesContainer}>
      <h1 className={styles.heading}>Your Stories</h1>
      <div className={styles.Stories}>
        {userStories &&
          userStories.map((story) => <Story story={story} key={story._id} />)}

        {userStories.length === 0 && (
          <div className={styles.empty_stories_message}>
            <h1 className={styles.no_story_heading}>
              You have not added any stories yet!
            </h1>
            <Button text="Go to Home" myFunction={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
