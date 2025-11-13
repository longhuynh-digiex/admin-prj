import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (pageIndex: number, pageSize: number) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getUser(pageIndex, pageSize),
  });
};
