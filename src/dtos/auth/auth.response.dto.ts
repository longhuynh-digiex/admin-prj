import z from "zod";
import { AuthUserSchema } from "./auth.dto";

export const LoginResponseSchema = AuthUserSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;
