import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import axiosInstance from "@/lib/axios";

const BASE_URL = "auth";
export const authApiRequest = {
  login: (body: LoginRequestDTO) =>
    axiosInstance.post<LoginResponseDTO>(`/${BASE_URL}/login`, {
      ...body,
      expiresInMins: process.env.NEXT_PUBLIC_TOKEN_EXPIRE_IN_MINS,
    }),

  getMe: () => axiosInstance.get<LoginResponseDTO>(`/${BASE_URL}/me`),
};
