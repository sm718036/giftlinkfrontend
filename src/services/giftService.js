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
  static getMyGifts() {
    return axiosInstance.get("/gifts/my-gifts");
  }
  static postNewGift(payload) {
    return axiosInstance.post("/gifts/post-gift", payload);
  }
  static updateGift(giftId, payload) {
    return axiosInstance.patch(`/gifts/update/${giftId}`, payload);
  }
  static deleteGift(giftId) {
    return axiosInstance.delete(`/gifts/delete/${giftId}`);
  }
}
