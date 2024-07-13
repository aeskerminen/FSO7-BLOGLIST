import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const SingleBlog = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [blog, setBlog] = useState(null);

  const [commentInput, setCommentInput] = useState("");

  const get = async () => {
    const res = await blogService.getBlog(id);
    setBlog(res);
  };

  useEffect(() => {
    get();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();

    blogService.commentBlog(blog.id, commentInput);
    setBlog({ ...blog, comments: [...blog.comments, commentInput] });
    setCommentInput("");
  };

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
              dispatch(likeBlog(id, blog.likes + 1));
              setBlog({ ...blog, likes: blog.likes + 1 });
            }}
          >
            Like
          </button>
        </div>
        <p>Added by {blog.user.name}</p>

        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            name="comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          ></input>
          <button type="submit">add comment</button>
        </form>
        <div>
          <ul>
            {blog.comments.map((c, i) => {
              return <li key={i}>{c}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
