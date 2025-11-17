import z from "zod";

export const DashboardKpiSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  newUsersThisMonth: z.number(),
  growthRatePercent: z.number(),
});

export type TDashboardKpi = z.infer<typeof DashboardKpiSchema>;

export const UsersByMonthItemSchema = z.object({
  month: z.string(),
  newUsers: z.number(),
});

export type TUsersByMonthItem = z.infer<typeof UsersByMonthItemSchema>;

export const UsersByMonthSchema = z.array(UsersByMonthItemSchema);
export type TUsersByMonth = z.infer<typeof UsersByMonthSchema>;

export const UsersByRoleItemSchema = z.object({
  role: z.string(),
  count: z.number(),
});

export type TUsersByRoleItem = z.infer<typeof UsersByRoleItemSchema>;

export const UsersByRoleSchema = z.array(UsersByRoleItemSchema);
export type TUsersByRole = z.infer<typeof UsersByRoleSchema>;

export const UsersByStatusItemSchema = z.object({
  status: z.string(),
  count: z.number(),
});

export type TUsersByStatusItem = z.infer<typeof UsersByStatusItemSchema>;

export const UsersByStatusSchema = z.array(UsersByStatusItemSchema);
export type TUsersByStatus = z.infer<typeof UsersByStatusSchema>;

export const UsersByCompanyItemSchema = z.object({
  companyName: z.string(),
  count: z.number(),
});

export type TUsersByCompanyItem = z.infer<typeof UsersByCompanyItemSchema>;

export const UsersByCompanySchema = z.array(UsersByCompanyItemSchema);
export type TUsersByCompany = z.infer<typeof UsersByCompanySchema>;

export const DashboardAdminResponseSchema = z.object({
  kpi: DashboardKpiSchema,
  usersByMonth: UsersByMonthSchema,
  usersByRole: UsersByRoleSchema,
  usersByStatus: UsersByStatusSchema,
  usersByCompany: UsersByCompanySchema,
});

export type TDashboardAdminResponseSchema = z.infer<
  typeof DashboardAdminResponseSchema
>;

export type TDashboardAdminResponseDTO = {
  data: TDashboardAdminResponseSchema;
};
