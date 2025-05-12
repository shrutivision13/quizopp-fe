import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/article/`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetArticle = (data) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return axios
    .get(`${api}getAll`, {headers})
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiGetTrendingArticles = () => {
  return axios
    .get(`${api}getTrendingArticles`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export { ApiGetArticle, ApiGetTrendingArticles };
