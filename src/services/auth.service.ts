import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import { HttpService } from "./http/http.service";
import { AUTH_BASE_URL, LOGIN_ENDPOINT } from "@/constant/auth.endpoint";

class AuthServiceBase {
  private client;
  protected readonly basePath = AUTH_BASE_URL;

  constructor() {
    this.client = new HttpService();
  }

  public login(body: LoginRequestDTO) {
    const fullUrl = `${this.basePath}/${LOGIN_ENDPOINT}`;
    return this.client.post<LoginRequestDTO, LoginResponseDTO>(fullUrl, {
      ...body,
    });
  }
}

const AuthService = new AuthServiceBase();

export default AuthService;
