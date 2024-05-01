import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.module.css";
import Button from "../Button/Button";

const PageNotFound = () => {
  const navigateToHome = useNavigate();

  return (
    <div className={styles.not_found_wrapper}>
      <img
        className={styles.not_found_image}
        src="https://i.imgur.com/qIufhof.png"
        alt="not found"
      />
      <h1 className={styles.not_found_title}>Uh oh! Looks like you're lost.</h1>

      <Button
        buttonText="Go Home"
        onClickFunc={() => navigateToHome("/")}
        buttonColor="#ffa143"
      />
    </div>
  );
};

export default PageNotFound;
