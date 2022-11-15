import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;


const getToken = () => {
    try {
        const token = localStorage.getItem('token');
        return token
    }
    catch { return null }
}

const defaultAxios = axios.create({
    baseURL: API_URL,
});

defaultAxios.interceptors.request.use(
    config => {
        const token = getToken();
        if (!config.headers) config.headers = {};
        if (token) config.headers['Authorization'] = 'Bearer ' + token;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => { Promise.reject(error); }
);

const uploadAxios = axios.create({
    baseURL: API_URL,
});

uploadAxios.interceptors.request.use(
    config => {
        const token = getToken();
        if (!config.headers) config.headers = {};
        if (token) config.headers['Authorization'] = 'Bearer ' + token;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    error => { Promise.reject(error); }
);
export { defaultAxios, uploadAxios }

export default defaultAxios;