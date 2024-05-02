import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { REGISTER, ADD_STORY, EDIT_STORY, LOGIN } from "./contants.js";
import { loadUser } from "./redux/actions/auth.js";

// Importing necessary components
import Home from "./pages/HomePage/Homeapage.jsx";
import Bookmarks from "./pages/BookmarkPage/BookmarkPage.jsx";
import Loader from "./components/Loader/Loader.jsx";
import UserStories from "./pages/StoryPage/StoryPage.jsx";
import Auth from "./components/Auth/Auth.jsx";
// import Navbar from "./components/Header/Header.jsx";
import Modal from "./components/Modal/Modal.jsx";
import NotFound from "./components/NotFound/PageNotFound.jsx";
import AddStory from "./components/Story/StoryForm/StoryAdd.jsx";
import ViewStory from "./components/Story/ViewStory/ViewStory.jsx";
// import ViewStory from "./components/story/ViewStory/ViewStory.jsx";
import EditStory from "./components/Story/StoryForm/StoryEdit.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import ViewStory from "./components/story/ViewStory/ViewStory.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state) => state.modal);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Navbar />

      {modalContent === REGISTER && (
        <Modal>
          <Auth />
        </Modal>
      )}
      {modalContent === LOGIN && (
        <Modal>
          <Auth />
        </Modal>
      )}
      {modalContent === ADD_STORY && (
        <Modal>
          <AddStory />
        </Modal>
      )}
      {modalContent === EDIT_STORY && (
        <Modal>
          <EditStory />
        </Modal>
      )}

      <ToastContainer></ToastContainer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/story/:id"
          element={
            <Modal>
              <ViewStory />
            </Modal>
          }
        />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/my/stories" element={<UserStories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
