import React from "react";
import styles from "./StorySlider.module.css";
import { useSelector } from "react-redux";

const Slide = ({ slides, imgIndex }) => {
  const { isSmallScreen } = useSelector((state) => state.layout);

  return (
    <div className={styles.slides} style={{ width: "100%", height: "100%" }}>
      {slides &&
        slides.map((slide, index) => (
          <>
            <img
              className={styles.slideImage}
              key={slide._id}
              style={{
                display: index === imgIndex ? "block" : "none",
                width: "100%",
                height: isSmallScreen ? "100vh" : "90vh",
              }}
              src={slide?.imageUrl}
              alt={`Slide ${index}`}
            />
            <div
              className={styles.slideText}
              style={{ display: index === imgIndex ? "block" : "none" }}
            >
              <h1 className={styles.slideHeading}>{slide?.heading}</h1>
              <p className={styles.slideP}>{slide?.description}</p>
            </div>
          </>
        ))}
    </div>
  );
};

export default Slide;
