import axios from "axios";
import jsonBig from "json-bigint";

export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

const authAxios = axios.create({
  baseURL: AUTH_API_URL,
  transformResponse: function (response) {
    return jsonBig().parse(response);
  },
});

authAxios.interceptors.request.use(
  config => {
    if (!config.headers) config.headers = {};
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
    if (!config.headers) config.headers = {};
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
export { authAxios, uploadAxios };

export default authAxios;
