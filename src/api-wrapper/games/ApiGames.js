import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/`;

const ApiGetGames = () => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    return axios
        .get(`${api}playGames`, { headers })
        .then((response) => response?.data)
        .catch((response) => response?.data);
}

const ApiGetGamesQuestions = (categoryId) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    return axios
        .get(`${api}quiz/getNormalGameQuestions?categoryId=${categoryId}`, { headers })
        .then((response) => response?.data)
        .catch((response) => response?.data);
};

const ApiGetOneCategory = (categoryId) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    return axios
        .get(`${api}category/getOneCategory/${categoryId}`, { headers })
        .then((response) => response?.data)
        .catch((response) => response?.data);
};

const ApiSubmitGameResult = (categoryId) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    return axios
        .get(`${api}quizParticipation/update/`, { headers })
        .then((response) => response?.data)
        .catch((response) => response?.data);
};

export {
    ApiGetGamesQuestions,
    ApiGetOneCategory,
    ApiSubmitGameResult
};
