import { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const CreateView = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    props.addBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  if (!formVisible) {
    return (
      <div>
        <button
          className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black"
          onClick={() => setFormVisible(true)}
        >
          Create new blog
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center bg-gray-400 p-2 rounded">
        <h2 className="p-2 text-2xl text-black">Create new blog</h2>
        <form
          className="bg-gray p-2 flex flex-col items-end gap-2 text-white text-xl"
          onSubmit={(e) => {
            handleCreateBlog(e);
            setFormVisible(false);
          }}
        >
          <div className="">
            title
            <input
              className="p-2 bg-white text-black rounded ml-2"
              data-testid="titleInput"
              id="titleInput"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
            ></input>
          </div>
          <div>
            author
            <input
              className="p-2 bg-white text-black rounded ml-2"
              data-testid="authorInput"
              id="authorInput"
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              name="author"
            ></input>
          </div>
          <div className="">
            url
            <input
              className="p-2 bg-white text-black rounded ml-2"
              data-testid="urlInput"
              id="urlInput"
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              name="url"
            ></input>
          </div>
          <button className="p-1 pl-4 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 self-center text-black" type="submit">Create</button>
        </form>
        <div className="h-1 bg-black w-full rounded-full mb-2"></div>
        <button className="p-1 pl-4 pr-4 rounded-full bg-red-100 hover:bg-red-200 active:bg-red-300 self-center text-black" onClick={() => setFormVisible(false)}>
          Cancel
        </button>
      </div>
    );
  }
};

CreateView.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default CreateView;
