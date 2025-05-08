import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

const ApiGetCategories = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}/category/getCategories`, { headers }) // headers must be in config object
    .then((res) => res.data)
    .catch((err) => err?.response?.data || { error: "Network error" });
};

const ApiGetActiveContent = (categoryId) => {
  return axios
    .get(`${api}/contest/getActiveContests?categoryId=${categoryId}`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetInitialCategory = () => {
  return axios
    .get(`${api}/category/getInitialCategory`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetAllCategoryDetails = (categoryId) => {
  return axios
    .get(`${api}/category/getAllCategoryDetails/${categoryId}`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export { ApiGetCategories, ApiGetActiveContent, ApiGetInitialCategory, ApiGetAllCategoryDetails };
