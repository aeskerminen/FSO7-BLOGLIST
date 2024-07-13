import { useEffect } from "react";
import Blog from "./Blog";
import CreateView from "./CreateView";
import {
  initializeBlogs,
  addBlog,
  deleteBlog,
  likeBlog,
} from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const BlogView = () => {
  const currentUser = JSON.parse(
    window.localStorage.getItem("loggedInUser"),
  ).username;

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleAddBlog = async ({ title, author, url }) => {
    dispatch(addBlog({ title, author, url }));
  };

  const handleDeleteBlog = async (id) => {
    dispatch(deleteBlog(id));
  };

  const handleLikeBlog = async (id, likes) => {
    dispatch(likeBlog(id, likes));
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
