import { z } from "zod";

import { BaseSchema } from "./base";

// User
export const User = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must include at least one letter, one number, and one special character"
    ),
});

export const zUser = User.merge(BaseSchema);
export type UserType = z.infer<typeof zUser>;
