import z from "zod";
import { AuthUserSchema } from "../auth/auth.dto";

export const UserSchema = AuthUserSchema.extend({
  maidenName: z.string().optional(),
  age: z.number().optional(),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
  bloodGroup: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  address: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      stateCode: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export type TUser = z.infer<typeof UserSchema>;
