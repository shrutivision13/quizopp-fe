import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/user`;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const ApiLikeCategory = (data) => {
  const userToken = getCookie("authToken");

  return axios
    .post(`${api}/likeCategory`, data, {
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
      .post(`${api}/unlikeCategory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => res.data)
      .catch((res) => res.data);
  };