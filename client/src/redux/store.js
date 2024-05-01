import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authReducer.js";
import modalSlice from "./reducers/modalReducer.js";
import storyReducer from "./reducers/storyReducer.js";
import layoutReducer from "./reducers/layoutReducer.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    story: storyReducer,
    layout: layoutReducer,
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
