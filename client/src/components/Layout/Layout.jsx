import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../../redux/reducers/layoutReducer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  // Function to check and dispatch screen size
  const checkScreenSize = () => {
    const screenWidth = window.innerWidth;

    dispatch(
      setScreenSize({
        isSmallScreen: screenWidth < 768,
        isLargeScreen: screenWidth >= 768,
      })
    );
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return <>{children}</>;
};

export default Layout;
