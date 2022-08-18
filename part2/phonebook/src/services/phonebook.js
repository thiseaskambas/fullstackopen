import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addNewContact = (data) => {
  return axios.post(baseUrl, data).then((res) => res.data);
};

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { addNewContact, getAll, deleteContact };
