import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: { content: "", displayed: false },
  reducers: {
    setMessage(state, action) {
      return { ...state, content: action.payload };
    },

    setDisplayed(state, action) {
      return { ...state, displayed: action.payload };
    },
  },
});

export const { setMessage, setDisplayed } = notificationReducer.actions;

export const setNotification = (msg, time) => {
  return async (dispatch) => {
    dispatch(setMessage(msg));
    dispatch(setDisplayed(true));

    setTimeout(() => {
      dispatch(setDisplayed(false));
      dispatch(setMessage(""));
    }, time * 1000);
  };
};

export default notificationReducer.reducer;
