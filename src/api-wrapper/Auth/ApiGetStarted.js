import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const ApiGetStarted = (payload) => {
  return axios
    .post(`${api}/auth/addUser`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};
