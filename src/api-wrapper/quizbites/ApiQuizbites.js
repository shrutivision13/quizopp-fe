import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

const ApiGetQuizBitesQuestions = (categoryId) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    return axios
        .post(`${api}/quiz/getQuizBitesQuestions`, categoryId, { headers })
        .then((response) => response?.data)
        .catch((error) => error);
};

const ApiUpdatePrize = (correctAnswer) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    return axios
        .put(`${api}/quizBites/prize`, correctAnswer, { headers })
        .then((response) => response?.data)
        .catch((response) => response?.data);
};

export {
    ApiGetQuizBitesQuestions,
    ApiUpdatePrize
};