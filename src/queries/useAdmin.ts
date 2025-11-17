import { AdminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminDashboardData = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => AdminService.getDashboardData(),
  });
};
