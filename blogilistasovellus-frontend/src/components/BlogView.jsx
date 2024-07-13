import { useEffect, useState } from "react";
import Blog from "./Blog";
import CreateView from "./CreateView";
import blogService from "../services/blogs";
import blogReducer, { initializeBlogs, addBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const BlogView = () => {
  const currentUser = JSON.parse(
    window.localStorage.getItem("loggedInUser"),
  ).username;

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogSorterFunction = (a, b) => a.likes < b.likes;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleAddBlog = async ({ title, author, url }) => {
    dispatch(addBlog({ title, author, url }));
  };

  const handleDeleteBlog = async (id) => {
    await blogService.deleteBlog(id);

    let temp = [...blogs];
    temp = temp.filter((b) => b.id !== id);

    setBlogs(temp);
  };

  const handleLikeBlog = async (id, likes) => {
    await blogService.likeBlog(id, likes);
    let temp = [...blogs];
    temp[temp.findIndex((b) => b.id === id)].likes = likes;
    temp = temp.sort(blogSorterFunction);
    setBlogs(temp);
  };

  return (
    <div>
      <CreateView addBlog={handleAddBlog}></CreateView>
      <h2>blogs</h2>
      <div data-testid="blogContainer">
        {blogs.map((blog, i) => (
          <Blog
            likeBlog={handleLikeBlog}
            showRemove={blog.user.username === currentUser}
            deleteBlog={handleDeleteBlog}
            key={blog.id || i}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogView;
