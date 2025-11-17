"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import UserTable from "@/components/user-table";
import { useGetAdminDashboardData } from "@/queries/useAdmin";

export default function Page() {
  const { data, isSuccess, isError, isPending, error } =
    useGetAdminDashboardData();
  if (isError) {
    console.log(error);
  }
  if (isPending) return;
  if (isSuccess) {
    console.log(data);

    return (
      <>
        <SectionCards
          activeUsers={data.data.data.kpi.activeUsers}
          growthRatePercent={data.data.data.kpi.growthRatePercent}
          newUsersThisMonth={data.data.data.kpi.newUsersThisMonth}
          totalUsers={data.data.data.kpi.totalUsers}
        />

        <ChartAreaInteractive chartData={data.data.data.usersByMonth} />

        <UserTable />
      </>
    );
  }
}
