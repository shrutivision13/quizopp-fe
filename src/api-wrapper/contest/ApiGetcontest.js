import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/contest/`;
// const authToken = localStorage.getItem('sellerToken')
// const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetContests = (data) => {
  return axios
    .get(`${api}getActiveContests`)
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { ApiGetContests };

