import { useQuery } from "@tanstack/react-query";
import GiftService from "../services/giftService";
import { queryKeys } from "./queryKeys";

export const useGetAllGifts = (params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.gifts.getAllGifts(params),
    queryFn: () => GiftService.getAllGifts(params),
  });
  return {
    allGifts: data?.gifts,
    paginationMeta: data?.metaData,
    isLoadingAllGifts: isLoading,
    errorInGettingAllGifts: error,
  };
};

export const useGetGiftDetailsById = (giftId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.gifts.getGiftDetailsById(giftId),
    queryFn: () => GiftService.getGiftDetailsById(giftId),
  });
  return {
    giftDetails: data?.gift,
    isLoadingGiftDetails: isLoading,
    errorInGettingGiftDetails: error,
  };
};

export const useSearchGifts = (params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.gifts.searchGifts(params),
    queryFn: () => GiftService.searchGifts(params),
  });
  return {
    foundGifts: data?.gifts,
    paginationMeta: data?.metaData,
    isFindingGifts: isLoading,
    errorInFindingGifts: error,
  };
};
