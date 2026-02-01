export const queryKeys = {
  auth: {
    getMe: ["me"],
  },
  gifts: {
    getAllGifts: (params) => ["gifts", "all", params],
    getGiftDetailsById: (giftId) => ["gift", "details", giftId],
    searchGifts: (params) => ["gifts", "all", "search", params],
  },
};
