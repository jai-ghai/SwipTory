import React, { useEffect } from "react";
import styles from "./ViewStory.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../common/Modal/modalSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { likeStory, bookmarkStory, getStory } from "../storyAPI";
import StorySlider from "../StorySlider/StorySlider";
import Loader from "../../common/Loader/Loader";
import shareIcon from "../../../assets/share.svg";

const ViewStory = () => {
  const dispatch = useDispatch();
  const { story, storyLoading, liked, bookmarked, totalLikes, newLike } =
    useSelector((state) => state.story);
  const { isAuthenticated, userId, loading } = useSelector(
    (state) => state.auth
  );

  const { id } = useParams();
  const storyId = id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      handleFetchStory();
    }
    dispatch(openModal("VIEW_STORY"));
    return () => dispatch(closeModal());
  }, [isAuthenticated, dispatch, loading]);

  const handleFetchStory = async () => {
    dispatch(getStory(storyId, userId));
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(likeStory(storyId, userId));
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(bookmarkStory(storyId, userId));
    }
  };

  const handleShareStory = () => {
    const url = window.location.href;
    window.navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard successfully!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard:", { position: "top-center" });
      });
  };

  if (storyLoading || loading) {
    return <Loader></Loader>;
  }

  return (
    <div className={`${styles.view_story_container}`}>
      <div className={`${styles.view_story} `}>
        <div className={`${styles.story_btns} ${styles.story_btns_1}`}>
          {/* Close Story Icon */}
          <div className={styles.close_btn} onClick={() => navigate("/")}>
            {/* SVG path for close icon */}
          </div>
          {/* Share Icon */}
          <div className={styles.share_btn} onClick={handleShareStory}>
            <img src={shareIcon} alt="share" />
          </div>
        </div>

        <StorySlider slides={story && story.slides} />

        <div className={`${styles.story_btns} ${styles.story_btns_2}`}>
          {/* Bookmark Icon */}
          <div className={styles.bookmark}>
            {/* SVG path for bookmark icon */}
          </div>
          {/* Like Icon */}
          <div className={styles.like}>
            {/* SVG path for like icon */}
            <p className={styles.totalLikes}>
              {totalLikes + (newLike ? 1 : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
