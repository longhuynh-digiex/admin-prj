import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import { HttpService } from "./http/http.service";

const BASE_URL = "auth";
type hehe = LoginRequestDTO & { expiresInMins: number };
class AuthServiceBase {
  private client;
  protected readonly basePath = "/user";

  constructor() {
    this.client = new HttpService();
  }

  public login(body: LoginRequestDTO) {
    return this.client.post<hehe, LoginResponseDTO>("/user/login", {
      ...body,
      expiresInMins: 1,
    });
  }

  async getMe() {
    return this.client.get<LoginResponseDTO>(`/${BASE_URL}/me`);
  }
}

const AuthService = new AuthServiceBase();

export default AuthService;
