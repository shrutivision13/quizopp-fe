import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetCategories = (data) => {
  return axios
    .get(`${api}/category/getCategories`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetActiveContent = (categoryId) => {
  return axios
    .get(`${api}/contest/getActiveContests?categoryId=${categoryId}`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export { ApiGetCategories , ApiGetActiveContent };
