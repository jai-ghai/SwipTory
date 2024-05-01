import React from "react";
import styles from "./StoryLoader.module.css";

const StoryLoader = () => {
  return (
    <div
      className={styles.loadingSkeleton}
      style={{
        width: "20rem",
        height: "20rem",
      }}
    ></div>
  );
};

export default StoryLoader;
