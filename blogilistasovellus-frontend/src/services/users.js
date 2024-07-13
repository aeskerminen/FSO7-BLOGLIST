import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async (creds) => {
  const response = await axios.get(baseUrl, creds);
  return response.data;
};

export default { getUsers };
