import z from "zod";

export const AuthUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
});

export type TAuthUser = z.infer<typeof AuthUserSchema>;
