import axios from "axios";
import jsonBig from "json-bigint";
import { API_URL, AUTH_API_URL } from "./constants";

const defaultAxios = axios.create({
  baseURL: API_URL,
  transformResponse: function (response) {
    return jsonBig({ storeAsString: true }).parse(response);
  },
  headers: { "Content-Type": "application/json" },
});

const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch {
    return null;
  }
};

const authAxios = axios.create({
  baseURL: AUTH_API_URL,
  transformResponse: function (response) {
    return jsonBig().parse(response);
  },
  headers: { "Content-Type": "application/json" },
});

authAxios.interceptors.request.use(
  config => {
    const token = getToken();
    if (!config.headers) config.headers = {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const uploadAxios = axios.create({
  baseURL: AUTH_API_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

uploadAxios.interceptors.request.use(
  config => {
    const token = getToken();
    if (!config.headers) config.headers = {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
export { authAxios, uploadAxios, defaultAxios };

export default defaultAxios;
