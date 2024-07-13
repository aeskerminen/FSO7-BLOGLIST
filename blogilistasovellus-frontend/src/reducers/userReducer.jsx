import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import notificationReducer, { setNotification } from "./notificationReducer";

const blogReducer = createSlice({
  name: "user",
  initialState: JSON.parse(window.localStorage.getItem("loggedInUser")),
  reducers: {
    login(state, action) {
      window.localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      blogService.setToken(action.payload.token);
      return { ...action.payload };
    },
    signout(state, action) {
      return null;
    },
  },
});

export const { login, signout } = blogReducer.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(login(user));
      dispatch(setNotification("Succesfully logged in!", 3));
    } catch {
      dispatch(setNotification("Login failed...", 3));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(signout());
  };
};

export default blogReducer.reducer;
