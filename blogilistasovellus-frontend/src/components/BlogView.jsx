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
    <div className="p-2 flex flex-col items-center mt-10 h-full">
      <CreateView addBlog={handleAddBlog}></CreateView>
      <h2 className="p-2 m-2 text-3xl">Blogs</h2>
      <div data-testid="blogContainer" className="p-2 bg-gray-200 w-full">
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
