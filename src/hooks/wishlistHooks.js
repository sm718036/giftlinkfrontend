import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import WishlistService from "../services/wishlistService";
import { queryKeys } from "./queryKeys";

export const useWishlist = (enabled = true) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.wishlist.getWishlist(),
    queryFn: () => WishlistService.getWishlist(),
    enabled,
  });
  return {
    wishlistGifts: data?.gifts ?? [],
    wishlistIds: (data?.gifts ?? []).map((g) => g._id),
    isLoadingWishlist: isLoading,
    errorInGettingWishlist: error,
  };
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (giftId) => WishlistService.addToWishlist(giftId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist.getWishlist(),
      });
    },
  });
  return {
    addToWishlist: mutation.mutateAsync,
    isAddingToWishlist: mutation.isPending,
    errorAddingToWishlist: mutation.error,
  };
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (giftId) => WishlistService.removeFromWishlist(giftId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist.getWishlist(),
      });
    },
  });
  return {
    removeFromWishlist: mutation.mutateAsync,
    isRemovingFromWishlist: mutation.isPending,
    errorRemovingFromWishlist: mutation.error,
  };
};
