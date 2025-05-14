import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const ApiRegisterWithPhone = (authToken, payload) => {
  return axios
    .post(`${api}/auth/registerPhone`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export const ApiRegisterWithGoogle = (authToken, payload) => {
  return axios
    .post(`${api}/auth/googleSignup`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
    .then((response) => response?.data)
    .catch((response) => response?.data);
};


export const ApiVerifyOtp = (payload) => {
  return axios
    .post(`${api}/auth/verifyOTP`, payload)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};

export const ApiResendOTP = (payload) => {
  return axios
    .post(`${api}/auth/resendOTP`, payload)
    .then((response) => response?.data)
    .catch((response) => response?.data);
};
