import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useGetMyGifts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.gifts.getMyGifts(),
    queryFn: () => GiftService.getMyGifts(),
  });
  return {
    myGifts: data?.gifts ?? [],
    isLoadingMyGifts: isLoading,
    errorInGettingMyGifts: error,
  };
};

export const usePostNewGift = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => GiftService.postNewGift(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gifts.getMyGifts() });
    },
  });
  return {
    createGift: mutation.mutateAsync,
    isCreatingGift: mutation.isPending,
    errorCreatingGift: mutation.error,
  };
};

export const useUpdateGift = (giftId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => GiftService.updateGift(giftId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.gifts.getGiftDetailsById(giftId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.gifts.getMyGifts() });
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
  return {
    updateGift: mutation.mutateAsync,
    isUpdatingGift: mutation.isPending,
    errorUpdatingGift: mutation.error,
  };
};

export const useDeleteGift = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (giftId) => GiftService.deleteGift(giftId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.gifts.getMyGifts() });
    },
  });
  return {
    deleteGift: mutation.mutateAsync,
    isDeletingGift: mutation.isPending,
    errorDeletingGift: mutation.error,
  };
};
