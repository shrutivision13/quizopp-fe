import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/`;


const ApiGetContests = () => {
  return axios
    .get(`${api}contest/getActiveContests`)
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
  return axios
    .put(
      `${api}participant/play?participantId=${participantId}`)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

const ApiSubmitContest = (participantId , payload ) => {
  return axios
    .put(
      `${api}participant/submit?participantId=${participantId}` , payload)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export { ApiGetContests, ApiGetContestQuestions, ApiJoinContest , ApiPlayContest , ApiSubmitContest};
