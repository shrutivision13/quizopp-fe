import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/article/`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetArticle = (data) => {
  return axios
    .get(`${api}getAll`, data)
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { ApiGetArticle };