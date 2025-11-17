import {
  ADMIN_DASHBOARD_BASE_URL,
  ADMIN_DASHBOARD_DATA_ENDPOINT,
} from "@/constant/admin.endpoint";
import { HttpService } from "./http/http.service";
import { TDashboardAdminResponseDTO } from "@/dtos/admin/admin.response.dto";

class AdminServiceBase {
  private readonly basePath = ADMIN_DASHBOARD_BASE_URL;

  private client;

  constructor() {
    this.client = new HttpService();
  }

  getDashboardData() {
    const fullUrl = `${ADMIN_DASHBOARD_BASE_URL}/${ADMIN_DASHBOARD_DATA_ENDPOINT}`;
    return this.client.get<TDashboardAdminResponseDTO>(fullUrl);
  }
}

export const AdminService = new AdminServiceBase();
