// axiosInstance.js
import axios from "axios";

const BASE_URL = "https://lms1-backend.onrender.com/api/v1/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add token from localStorage to every request
axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.data).token;
    console.log("Token in axios interceptor:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
