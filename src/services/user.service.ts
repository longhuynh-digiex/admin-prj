import { GetUsersResponseDTO } from "@/dtos/user/user.response";
import { HttpService } from "./http/http.service";
import { ME_ENDPOINT, USER_SEARCH_ENDPOINT } from "@/constant/users.endpoint";
import { TAuthUser } from "@/dtos/auth/auth.dto";

class UserServiceBase {
  private client;
  protected readonly basePath = "/users";

  constructor() {
    this.client = new HttpService();
  }

  getUser(pageIndex: number, pageSize: number, q: string = "") {
    return this.client.get<GetUsersResponseDTO>(
      `${this.basePath}/${USER_SEARCH_ENDPOINT}`,
      {
        params: { q, limit: pageSize, skip: pageIndex * pageSize },
      }
    );
  }

  searchUser(pageIndex: number, pageSize: number, q: string) {
    return this.client.get(`${this.basePath}/${USER_SEARCH_ENDPOINT}`, {
      params: { q, limit: pageSize, skip: pageIndex * pageSize },
    });
  }

  getMe() {
    return this.client.get<TAuthUser>(`${this.basePath}/${ME_ENDPOINT}`);
  }

  deleteUser(userId: string) {
    return this.client.delete(`${this.basePath}/${userId}`);
  }
}

const UserService = new UserServiceBase();

export default UserService;
