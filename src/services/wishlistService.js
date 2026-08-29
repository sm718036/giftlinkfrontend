import axiosInstance from "./axiosRequestManager";

export default class WishlistService {
  static getWishlist() {
    return axiosInstance.get("/wishlist");
  }
  static addToWishlist(giftId) {
    return axiosInstance.post("/wishlist/add", { giftId });
  }
  static removeFromWishlist(giftId) {
    return axiosInstance.delete(`/wishlist/remove-from-wishlist/${giftId}`);
  }
}
