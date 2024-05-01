import React from "react";
import styles from "./StorySlider.module.css";

const Progress = ({ images, progressBars }) => {
  return (
    <div className={styles.progressContainer}>
      {progressBars &&
        progressBars.map((bar) => (
          <div
            key={bar.id}
            className={styles.progressBar}
            style={{
              width: images
                ? images.length === 1
                  ? "100%"
                  : `${100 / (images.length - 1)}%`
                : "0%",
            }}
          >
            <div
              className={`${styles.progress} ${
                bar.completed ? styles.completed : ""
              }`}
              style={{ width: `${bar.progress}%` }}
            ></div>
            {bar.progress === 0 && (
              <img
                src={bar.image}
                alt={`Image ${bar.id}`}
                width={600}
                height={600}
                className={styles.img}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Progress;
