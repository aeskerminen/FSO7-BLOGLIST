import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

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
    del(state, action) {
      let temp = [...state];
      temp = temp.filter((b) => b.id !== action.payload);

      return [...temp];
    },
    like(state, action) {
      let temp = [...state];
      temp = temp.map((b) =>
        b.id === action.payload.id ? { ...b, likes: action.payload.likes } : b,
      );
      temp = temp.sort((a, b) => a.likes < b.likes);

      return [...temp];
    },
  },
});

export const { set, add, del, like } = blogReducer.actions;

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
    try {
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
      dispatch(
        setNotification(
          `New blog called ${newBlog.title} made by ${newBlog.author}`,
          3,
        ),
      );
    } catch {
      dispatch(setNotification("Error creating a new blog...", 3));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(del(id));
  };
};

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    await blogService.likeBlog(id, likes);

    dispatch(like({ id, likes }));
  };
};

export default blogReducer.reducer;
