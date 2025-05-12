import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/`;


const ApiGetContests = () => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return axios
    .get(`${api}contest/getActiveContests`, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetContestQuestions = (contestId) => {
  return axios
    .get(`${api}contest/getContestQuestions/${contestId}`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiJoinContest = (contestId, authToken) => {
  return axios
    .post(
      `${api}participant/join`,
      { contestId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response?.data)
    .catch((response) => response?.data);
};


const ApiPlayContest = (participantId) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .put(
      `${api}participant/play?participantId=${participantId}`, {}, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiSubmitContest = (participantId, payload) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .put(
      `${api}participant/submit?participantId=${participantId}`, payload, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiGetScore = (contestId) => {
  const token = getCookie("authToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(
      `${api}participant/score?id=${contestId}`, { headers })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export { ApiGetContests, ApiGetContestQuestions, ApiJoinContest, ApiPlayContest, ApiSubmitContest, ApiGetScore };
