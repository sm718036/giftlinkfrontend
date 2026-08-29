import axios from "axios";
import { appConfig } from "../config";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: appConfig.baseAppUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFriendlyErrorMessage = (error) => {
  if (error?.code === "ERR_CANCELED") return "The request was cancelled.";
  if (error?.code === "ECONNABORTED") return "The request took too long. Please try again.";
  if (!error?.response)
    return "We couldn't connect to GiftLink. Check your internet connection and try again.";

  const status = error.response.status;
  const serverMessage = error.response.data?.message || error.response.data?.error;

  if (status === 400) {
    if (/ageInYears/i.test(serverMessage || "")) return "Please enter a valid age for the gift.";
    if (/missing required fields/i.test(serverMessage || ""))
      return "Please complete all required gift details.";
    return (
      serverMessage || "Some information is missing or invalid. Please review it and try again."
    );
  }
  if (status === 401)
    return "Your session has expired or your sign-in details are incorrect. Please sign in again.";
  if (status === 403) return "You don't have permission to perform this action.";
  if (status === 404) return serverMessage || "We couldn't find what you were looking for.";
  if (status === 409)
    return serverMessage || "This information already exists. Please use different details.";
  if (status === 413)
    return "That image is too large. Please choose a smaller image and try again.";
  if (status === 422)
    return "Some information could not be processed. Please check the form and try again.";
  if (status === 429) return "Too many requests were made. Please wait a moment and try again.";
  if (status >= 500)
    return "GiftLink is having trouble right now. Please try again in a few moments.";
  return "Something went wrong. Please try again.";
};

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
    const message = getFriendlyErrorMessage(error);
    error.userMessage = message;
    error.message = message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
