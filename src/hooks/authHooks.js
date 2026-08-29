import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthService from "../services/authService";
import { queryKeys } from "./queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params) => AuthService.login(params),
    onSuccess: () => queryClient.clear(),
  });
  return {
    login: mutateAsync,
    isLoggingIn: isPending,
  };
};

export const useRegister = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params) => AuthService.register(params),
  });
  return {
    register: mutateAsync,
    isRegistering: isPending,
  };
};

export const useGetMe = (enabled) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.auth.getMe,
    queryFn: () => AuthService.getMe(),
    enabled,
  });
  return {
    user: data?.user,
    isLoadingUser: isLoading,
    isErrorInGettingUser: isError,
  };
};

export const useUpdateMyDetails = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params) => AuthService.updateMyDetails(params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.getMe,
      }),
  });
  return {
    updateMyDetails: mutateAsync,
    isUpdatingMyDetails: isPending,
  };
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params) => AuthService.changePassword(params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.getMe,
      }),
  });
  return {
    changePassword: mutateAsync,
    isChangingPassword: isPending,
  };
};
