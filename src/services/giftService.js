import axiosInstance from "./axiosRequestManager";

export default class GiftService {
  static getAllGifts(params) {
    return axiosInstance.get("/gifts", {
      params,
    });
  }
  static getGiftDetailsById(giftId) {
    return axiosInstance.get(`/gifts/${giftId}`);
  }
  static searchGifts(params) {
    return axiosInstance.get(`/gifts/search`, { params });
  }
}
