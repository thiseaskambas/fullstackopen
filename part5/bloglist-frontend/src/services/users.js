import axios from 'axios';
// import blogService from './blogs';

const baseUrl = '/api/users';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll };
