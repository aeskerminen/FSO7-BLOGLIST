import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogReducer = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    set(state, action) {
      return [...action.payload];
    },
    add(state, action) {
      return state.concat(action.payload);
    },
    update(state, action) {},
  },
});

export const { set, add } = blogReducer.actions;

export const initializeBlogs = (blogs) => {
  return async (dispatch) => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => a.votes < b.votes);
      dispatch(set(blogs));
    });
  };
};

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const curUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    const newBlog = await blogService.createBlog({ title, author, url });

    const blog = {
      likes: 0,
      id: newBlog.id,
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
      user: { username: curUser.username, name: curUser.name },
    };

    dispatch(add(blog));
  };
};

export default blogReducer.reducer;
