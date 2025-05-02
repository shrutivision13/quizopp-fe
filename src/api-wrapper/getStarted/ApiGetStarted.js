import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const ApiGetSatrted = (payload) => {
  return axios
    .post(`${api}/auth/addUser`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((res) => res.data);
};
