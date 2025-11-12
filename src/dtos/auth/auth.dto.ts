import z from "zod";

export const UserSchema = z.object({
  id: z.bigint().or(z.string()),
  username: z.string(),
  email: z.email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
});

export type TUser = z.infer<typeof UserSchema>;
