import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false);

  const handleLikeBlog = async () => {
    await props.likeBlog(props.blog.id, props.blog.likes + 1);
  };

  return (
    <div className="shadow-md bg-white p-2 m-2 rounded-lg flex flex-col">
      <div className="flex justify-between">
        <div>
          <p data-testid="titleParagraph" className="inline text-xl font-bold underline">
            <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
          </p>
          <p className="inline text-lg"> {props.blog.author}</p>
        </div>
        <button
          className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Hide" : "View"}
        </button>
      </div>
      {showAll && (
        <div>
          <p className="p-2 text-lg font-bold">URL: {props.blog.url}</p>
          <div>
            <p className="p-2 text-lg font-bold" data-testid="likeParagraph" style={{ display: "inline" }}>
              likes: {props.blog.likes}
            </p>
            <button className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black" onClick={() => handleLikeBlog()}>Like</button>
          </div>
          <p className="p-2 text-lg font-bold">name: {props.blog.user.name}</p>
        </div>
      )}
      {showAll && props.showRemove && (
        <button className="p-1 pl-4 pr-4 rounded-full bg-red-100 hover:bg-red-200 active:bg-red-300 self-center text-black"
          onClick={async () => {
            await props.deleteBlog(props.blog.id);
          }}
        >
          remove
        </button>
      )}
    </div>
  );
};

Blog.propTypes = {
  showRemove: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default Blog;
