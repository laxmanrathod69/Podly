import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email("You must enter a valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Your password is too long" })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "Password can only contain letters, numbers, and special characters",
    ),
})
