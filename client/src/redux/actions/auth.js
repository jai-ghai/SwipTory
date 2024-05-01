import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserSuccess,
  loadUserRequest,
  loadUserFailure,
} from "../reducers/authReducer";
import { getStoriesByUser } from "../actions/story";
import { server } from "../store";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

// ===================================== LOAD USER =====================================

export const loadUser = () => async (dispatch) => {
  const username = JSON.parse(localStorage.getItem("username"));
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/load/${username}`);

    dispatch(loadUserSuccess(data));

    // toast.success("User Loaded");
  } catch (error) {
    console.log(error);
    dispatch(loadUserFailure());
  }
};

// ===================================== REGISTER ==================================

export const register = (values) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(`${server}/user/register`, values, {
      withCredentials: true,
    });
    dispatch(registerSuccess(data));
    localStorage.setItem("username", JSON.stringify(data.username));
    toast.success("Register Successful", {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(registerFailure());
    console.log(error.response.data);
    toast.error(error.response.data);
  }
};

// ===================================== LOGIN =====================================

export const login = (values) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`${server}/user/login`, values, {
      withCredentials: true,
    });

    dispatch(loginSuccess(data));

    dispatch(getStoriesByUser(data.userId));
    localStorage.setItem("username", JSON.stringify(data.username));

    toast.success("Login Successful", {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure());
    toast.error(error.response.data);
  }
};

// ===================================== LOGOUT =====================================

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axios.post(`${server}/user/logout`, { withCredentials: true });

    dispatch(logoutSuccess());

    localStorage.removeItem("username");
    toast.success("Logout Successful", {
      position: "bottom-left",
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error(error.response.data);
  }
};
