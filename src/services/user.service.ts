import { GetUsersResponseDTO } from "@/dtos/user/user.response";
import axiosInstance from "@/lib/axios";

export const userApiRequest = {
  getUsers: (pageSize: number, pageIndex: number) =>
    axiosInstance.get<GetUsersResponseDTO>(`/${BASE_URL}`, {
      params: {
        limit: pageSize,
        skip: pageIndex,
      },
    }),
};

import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import { HttpService } from "./http/http.service";

const BASE_URL = "auth";
class UserServiceBase {
  private client;
  protected readonly basePath = "/users";

  constructor() {
    this.client = new HttpService();
  }

  getUser(pageIndex: number, pageSize: number) {
    return this.client.get<GetUsersResponseDTO>(`${this.basePath}`, {
      params: { limit: pageSize, skip: pageIndex },
    });
  }
}

const UserService = new UserServiceBase();

export default UserService;
