import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import AuthService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginRequestDTO) => AuthService.login(body),
  });
};
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (body: { accessToken?: string; refreshToken?: string }) =>
      AuthService.logout(body),
  });
};
