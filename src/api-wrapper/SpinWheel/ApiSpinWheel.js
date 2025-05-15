import axios from "axios";
import { getCookie } from "../categories/ApiCategories";

const api = `${import.meta.env.VITE_API_BASE_URL}/api/`;


const ApiSpinWheel = (amount) => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    return axios
        .post(
            `${api}spin-wheel`, { "amount": amount }, { headers })
        .then((response) => response?.data)
        .catch((error) => error?.response);
};
const ApiGetSpinWheel = () => {
    const token = getCookie("authToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    return axios
        .get(
            `${api}spin-wheel`, { headers })
        .then((response) => response?.data)
        .catch((error) => error?.response);
};

export { ApiSpinWheel, ApiGetSpinWheel }
