import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/category/`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetCategories = (data) => {
  return axios
    .get(`${api}getCategories`)
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { ApiGetCategories };
