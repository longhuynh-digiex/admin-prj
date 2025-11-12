import { authApiRequest } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["account-me"],
    queryFn: authApiRequest.getMe,
  });
};
