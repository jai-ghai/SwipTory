import React from "react";
import styles from "./StoryCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../common/Modal/modalSlice";
import { getStory } from "../storyAPI";

const Story = ({ story }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userId } = useSelector((state) => state.auth);

  const handleOpen = () => {
    navigate(`/story/${story._id}`);
  };

  const handleEditStory = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    dispatch(closeModal());
    dispatch(openModal("EDIT_STORY"));
    dispatch(getStory(story._id, userId));
  };

  const storyImg = story.slides[0]?.imageUrl;

  return (
    <div className={styles.storyCard}>
      <div
        className={styles.story}
        style={{
          backgroundImage: `linear-gradient(#00000099, #00000099), url(${storyImg})`,
        }}
        onClick={handleOpen}
      >
        <div className={styles.storyDes}>
          <h3 className={styles.storyTitle}>
            {story.slides[0].heading &&
              story.slides[0].heading.substring(0, 20)}
            {story.slides[0].heading.length > 30 && "..."}
          </h3>
          <p className={styles.storyContent}>
            {story.slides[0].description.substring(0, 30)}
            {story.slides[0].description.length > 30 && "..."}
          </p>
        </div>
      </div>

      {isAuthenticated && userId && story.addedBy === userId && (
        <div
          className={styles.editStory}
          onClick={handleEditStory}
          style={{ cursor: "pointer" }}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path for edit icon */}
          </svg>

          <div style={{ fontSize: "12px" }}>Edit</div>
        </div>
      )}
    </div>
  );
};

export default Story;
