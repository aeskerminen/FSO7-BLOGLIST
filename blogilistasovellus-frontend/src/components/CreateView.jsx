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

    try {
      props.addBlog({ title, author, url });
      dispatch(
        setNotification(`New blog called ${title} made by ${author}`, 3),
      );

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (e) {
      console.log(e);
      dispatch(setNotification("Error creating a new blog...", 3));
    }
  };

  if (!formVisible) {
    return (
      <div>
        <button onClick={() => setFormVisible(true)}>Create new blog</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Create new blog</h2>
        <form
          onSubmit={(e) => {
            handleCreateBlog(e);
            setFormVisible(false);
          }}
        >
          <div>
            title
            <input
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
              data-testid="authorInput"
              id="authorInput"
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              name="author"
            ></input>
          </div>
          <div>
            url
            <input
              data-testid="urlInput"
              id="urlInput"
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              name="url"
            ></input>
          </div>
          <button type="submit">Create</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    );
  }
};

CreateView.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default CreateView;
