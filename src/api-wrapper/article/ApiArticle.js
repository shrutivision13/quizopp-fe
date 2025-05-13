import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/article/`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetArticle = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}getAll`, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiGetTrendingArticles = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}getTrendingArticles`, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetArticleCategoryWise = (categoryId) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  if (categoryId) {
    return axios
      .get(`${api}getArticleCategoryWise?categoryId=${categoryId}`, { headers })
      .then((response) => response?.data)
      .catch((response) => response?.data);
  } else {
    return axios
      .get(`${api}getArticleCategoryWise`, { headers })
      .then((response) => response?.data)
      .catch((response) => response?.data);
  }
};

const ApiGetArticleContent = (articleId) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}get/${articleId}`, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export {
  ApiGetArticle,
  ApiGetTrendingArticles,
  ApiGetArticleCategoryWise,
  ApiGetArticleContent,
};
