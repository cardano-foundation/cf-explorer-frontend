import axios from "axios";
import jsonBig from "json-bigint";

export const API_URL = process.env.REACT_APP_API_URL;
export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;
export const COINGECKO_URL = "https://api.coingecko.com/api/v3/";

const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch {
    return null;
  }
};

const defaultAxios = axios.create({
  baseURL: API_URL,
  transformResponse: function (response) {
    return jsonBig().parse(response);
  },
  headers: {
    "Content-Type": "application/json",
  },
});

const authAxios = axios.create({
  baseURL: AUTH_API_URL,
  transformResponse: function (response) {
    return jsonBig().parse(response);
  },
});

authAxios.interceptors.request.use(
  config => {
    const token = getToken();
    if (!config.headers) config.headers = {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const uploadAxios = axios.create({
  baseURL: AUTH_API_URL,
});

uploadAxios.interceptors.request.use(
  config => {
    const token = getToken();
    if (!config.headers) config.headers = {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
export { authAxios, uploadAxios, defaultAxios };

export default authAxios;
