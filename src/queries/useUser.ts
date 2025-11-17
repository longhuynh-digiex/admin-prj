import UserService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = (
  pageIndex: number,
  pageSize: number,
  q?: string
) => {
  return useQuery({
    queryKey: ["users", pageIndex, pageSize, q],
    queryFn: () => UserService.getUser(pageIndex, pageSize, q),
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => UserService.getMe(),
    enabled: false,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
