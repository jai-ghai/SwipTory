import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookmarks } from "../../../redux/actions/story";
import Loader from "../../Loader/Loader";
import Story from "../../Story/StoryCard/StoryCard";
import Button from "../../Button/Button";
import styles from "./Bookmarks.module.css";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { bookmarks, bookmarksLoading } = useSelector((state) => state.story);
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks(userId));
  }, []);

  if (!isAuthenticated || bookmarksLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.storiesContainer}>
      <h1 className={styles.heading}>Your Bookmarks</h1>
      <div className={styles.bookmarks}>
        {bookmarks &&
          bookmarks.map((bookmark) => (
            <Story story={bookmark} key={bookmark._id} />
          ))}

        {bookmarks.length === 0 && (
          <div className={styles.empty_bookmarks_message}>
            <h1 className={styles.no_bookmark_heading}>
              You have no bookmarks!
            </h1>
            <Button text="Go to Home" myFunction={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
