import { removeAuthInfo } from "./helper";
import axios from "axios";
import jsonBig from "json-bigint";
import { refreshToken } from "./userRequest";
import { API_URL, AUTH_API_URL } from "./constants";

const defaultAxios = axios.create({
  baseURL: API_URL,
  transformResponse: function (response) {
    return jsonBig({ storeAsString: true }).parse(response);
  },
  headers: { "Content-Type": "application/json" },
});

const defaultAxiosDownload = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "*/*" },
  maxBodyLength: Infinity,
  responseType: "blob",
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
    config.headers = config.headers ?? {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  response => response,
  async error => {
    const originRequest = error.config;
    if (error.response?.data?.errorCode === "CC_3" && !originRequest._retry) {
      originRequest._retry = true;
      const response = await refreshToken({ refreshJwt: localStorage.getItem("refreshToken") || "" });
      localStorage.setItem("token", response.data?.accessToken);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data?.accessToken;
      return authAxios(originRequest);
    }
    if (error.response?.data?.errorCode === "CC_4") {
      removeAuthInfo();
      if (window.location.href.includes("/account")) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

const uploadAxios = axios.create({
  baseURL: AUTH_API_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

uploadAxios.interceptors.request.use(
  config => {
    const token = getToken();
    config.headers = config.headers ?? {};
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

uploadAxios.interceptors.response.use(
  response => response,
  async error => {
    const originRequest = error.config;
    if (error.response?.data?.errorCode === "CC_3" && !originRequest._retry) {
      originRequest._retry = true;
      const response = await refreshToken({ refreshJwt: localStorage.getItem("refreshToken") || "" });
      localStorage.setItem("token", response.data?.accessToken);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data?.accessToken;
      return authAxios(originRequest);
    }
    if (error.response?.data?.errorCode === "CC_4") {
      removeAuthInfo();
      if (window.location.href.includes("/account")) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export { authAxios, uploadAxios, defaultAxios, defaultAxiosDownload };

export default defaultAxios;
