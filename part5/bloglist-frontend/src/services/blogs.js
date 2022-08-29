import axios from "axios";
const baseUrl = "/api/blogs";

const logIn = async (credentials) => {
  const res = await axios.post("/api/login", credentials);
  return res.data;
};

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

export default { getAll, logIn, setToken, createBlog };
