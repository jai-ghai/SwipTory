import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { openModal } from "../../redux/reducers/modalReducer.js";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/myAvatar.png";
import bookmarkImg from "../../assets/bookmark.jpg";
import closeIcon from "../../assets/close.png";
import { REGISTER, LOGIN, ADD_STORY } from "../../contants.js";
import Button from "../Button/Button.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username, isSmallScreen } = useSelector(
    (state) => state.auth
  );

  const [menuClick, setMenuClick] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  useEffect(() => {
    console.log(isSmallScreen);
  }, [isSmallScreen]);

  return (
    <nav
      className={`${styles.navbar} ${
        isSmallScreen ? styles.navbar_mobile : ""
      }`}
    >
      <h2 className={styles.logoText}>SwipTory</h2>
      <div className={styles.navBtns}>
        {!isAuthenticated ? (
          <div className={styles.hamburger} onClick={handleMenuClick}>
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13H19M1 7H19M1 1H19"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            {menuClick && (
              <div className={styles.hamburger_content}>
                <Button
                  text="Register Now"
                  myFunction={() => dispatch(openModal(REGISTER))}
                  size="small"
                ></Button>
                <div style={{ height: "1rem" }}></div>
                <Button
                  text="Sign In"
                  myFunction={() => dispatch(openModal(LOGIN))}
                  size="small"
                ></Button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.hamburger} onClick={handleMenuClick}>
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13H19M1 7H19M1 1H19"
                stroke="black"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            {menuClick && (
              <div className={styles.hamburger_content}>
                <div className={styles.user_div}>
                  <img
                    src={avatar}
                    alt="avatar"
                    className={styles.profile}
                    width="40rem"
                    onClick={() => navigate("/")}
                  />
                  <h4 style={{ marginBottom: "1rem" }}>{username}</h4>
                </div>

                <Button
                  text="Your Story"
                  myFunction={() => navigate("/my/stories")}
                  size="small"
                ></Button>
                <Button
                  text="Bookmarks"
                  myFunction={() => navigate("/bookmarks")}
                  size="small"
                >
                  <img src={bookmarkImg} width="14rem" />
                </Button>

                <Button
                  text="Add story"
                  myFunction={() => dispatch(openModal(ADD_STORY))}
                  size="small"
                ></Button>

                <Button
                  text="logout"
                  myFunction={handleLogout}
                  size="small"
                ></Button>
              </div>
            )}
          </div>
        )}

        {menuClick && (
          <div className={styles.close} onClick={handleMenuClick}>
            <img src={closeIcon} alt="close" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
