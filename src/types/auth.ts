import { z } from "zod";

import { BaseSchema } from "./base";

// Login
export const zLogin = z.object({
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

export type LoginType = z.infer<typeof zLogin>;

// Register
export const Register = z.object({
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
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must include at least one letter, one number, and one special character"
    ),
});

export const zRegister = Register.merge(BaseSchema);
export type RegisterType = z.infer<typeof zRegister>;

// TokenResponseType
export const zTokenResponse = z.object({
  access_token: z.string(),
  access_token_expiry: z.number().int(),
  refresh_token: z.string(),
  refresh_token_expiry: z.number().int(),
});

export type TokenResponseType = z.infer<typeof zTokenResponse>;

// RefreshTokenResponseType
export const zRefreshTokenResponse = z.object({
  access_token: z.string(),
  access_token_expiry: z.number().int(),
});

export type RefreshTokenResponseType = z.infer<typeof zRefreshTokenResponse>;
