import axios from 'axios';
const baseUrl = '/api/blogs';

const logIn = async (credentials) => {
  const res = await axios.post('/api/login', credentials);
  return res.data;
};

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = async (data) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const like = async (blogId, likes) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${blogId}`, { likes: likes }, config);
  return res.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, logIn, setToken, createBlog, like, deleteBlog };
