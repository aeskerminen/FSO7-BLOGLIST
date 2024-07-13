import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const SingleBlog = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [blog, setBlog] = useState(null);
  const get = async () => {
    const res = await blogService.getBlog(id);
    setBlog(res);
  };
  useEffect(() => {
    get();
  }, []);

  console.log(blog);

  if (blog === null) return null;

  return (
    <div style={{ paddingTop: "1rem" }}>
      <h1 style={{ display: "inline" }}>{blog.title}</h1>
      <h2 style={{ display: "inline" }}> {blog.author}</h2>

      <div>
        <p>{blog.url}</p>
        <div>
          <p style={{ display: "inline" }}>{blog.likes} likes</p>
          <button
            onClick={async () => {
              await dispatch(likeBlog(id, blog.likes + 1));
              await get();
            }}
          >
            Like
          </button>
        </div>
        <p>Added by {blog.user.name}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
