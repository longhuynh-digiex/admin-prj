import z from "zod";
import { UserSchema } from "./auth.dto";

export const LoginResponseSchema = UserSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;
