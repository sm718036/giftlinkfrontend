import axios from "axios";
import { appConfig } from "../config";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: appConfig.baseAppUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
