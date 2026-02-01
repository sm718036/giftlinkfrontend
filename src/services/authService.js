import axiosInstance from "./axiosRequestManager";

export default class AuthService {
  static login(params) {
    return axiosInstance.post("/auth/login", params);
  }
  static register(params) {
    return axiosInstance.post("/auth/register", params);
  }
  static updateMyDetails(params) {
    return axiosInstance.put("/auth/update", params);
  }
  static getMe() {
    return axiosInstance.get("/auth/me");
  }
}
