import z from "zod";

export const LoginRequestSchema = z.object({
  username: z.string("Invalid user name"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
