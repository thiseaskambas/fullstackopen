import axios from "axios";

const baseUrl = "/api/persons";

const addNewContact = (data) => {
  return axios.post(baseUrl, data).then((res) => res.data);
};

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateContact = (object) => {
  return axios.put(`${baseUrl}/${object.id}`, object).then((res) => res.data);
};

export default { addNewContact, getAll, deleteContact, updateContact };
