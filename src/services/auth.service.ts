import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import { HttpService } from "./http/http.service";
import {
  AUTH_BASE_URL,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
} from "@/constant/auth.endpoint";
import { NEXT_PUBLIC_URL } from "@/constant/env.constant";

class AuthServiceBase {
  private client;
  protected readonly basePath = AUTH_BASE_URL;

  constructor() {
    this.client = new HttpService();
  }

  public login(body: LoginRequestDTO) {
    const fullUrl = `/auth/${LOGIN_ENDPOINT}`;
    return this.client.post<LoginRequestDTO, LoginResponseDTO>(
      fullUrl,
      {
        ...body,
      },
      {
        baseURL: NEXT_PUBLIC_URL,
      }
    );
  }

  public logout(body: { accessToken?: string; refreshToken?: string }) {
    const fullUrl = `/auth/${LOGOUT_ENDPOINT}`;
    return this.client.post(
      fullUrl,
      {
        body,
      },
      {
        baseURL: NEXT_PUBLIC_URL,
      }
    );
  }
}

const AuthService = new AuthServiceBase();

export default AuthService;
