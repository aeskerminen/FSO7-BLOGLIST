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
    <div className="p-2">
      <h1 className="p-2 text-2xl font-bold" style={{ display: "inline" }}>{blog.title}</h1>
      <h2 className="p-2 text-2xl" style={{ display: "inline" }}> {blog.author}</h2>

      <div className="p-4 flex flex-col gap-4">
        <p>{blog.url}</p>
        <div className="flex gap-2 items-center">
          <p className="inline text-xl">{blog.likes} likes</p>
          <button
            className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black"
            onClick={async () => {
              dispatch(likeBlog(id, blog.likes + 1));
              setBlog({ ...blog, likes: blog.likes + 1 });
            }}
          >
            Like
          </button>
        </div>
        <p className="text-xl">Added by {blog.user.name}</p>

        <h3 className="text-xl font-semibold">Comments</h3>
        <form className="p-2 bg-gray-200 w-fit flex gap-2" onSubmit={handleAddComment}>
          <input
            className="p-1 rounded"
            type="text"
            name="comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          ></input>
          <button className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black" type="submit">Add comment</button>
        </form>
        <div className="pl-8">
          <ul className="list-disc">
            {blog.comments.map((c, i) => {
              return <li className="text-lg" key={i}>{c}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
