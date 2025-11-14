import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import AuthService from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginRequestDTO) => AuthService.login(body),
  });
};
