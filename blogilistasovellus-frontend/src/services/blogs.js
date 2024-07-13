import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlog = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const createBlog = async (blog) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// No need to send whole blog over due to the way I coded the back end.
const likeBlog = async (id, likes) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.put(
    `${baseUrl}/${id}`,
    { likes: likes },
    config,
  );
  return response.data;
};

const commentBlog = async (id, comment) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(
    `${baseUrl}/${id}/comments`,
    {
      comment,
    },
    config,
  );

  return res.data;
};

export default {
  getAll,
  getBlog,
  createBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
  setToken,
};
