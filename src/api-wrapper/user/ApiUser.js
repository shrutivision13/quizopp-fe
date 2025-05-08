import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const ApiLikeCategory = (data) => {
  const userToken = getCookie("authToken");

  return axios
    .post(`${api}/user/likeCategory`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export const ApiDislikeCategory = (data) => {
  const userToken = getCookie("authToken");

  return axios
    .post(`${api}/user/unlikeCategory`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export const ApiGetCoinHistory = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}/coinHistory/all`, { headers }) // headers must be in config object
    .then((res) => res.data)
    .catch((err) => err?.response?.data || { error: "Network error" });
};

export const ApiGetWalletBalance = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(`${api}/user/walletBalance`, { headers }) // headers must be in config object
    .then((res) => res.data)
    .catch((err) => err?.response?.data || { error: "Network error" });
};
