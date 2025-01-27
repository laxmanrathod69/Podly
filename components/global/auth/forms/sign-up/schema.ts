import { z } from "zod"

export const SignUpSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters long" }),
  lastname: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(64, { message: "Password must be less than 64 characters long" })
    .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""), {
      message: "Password must contain at least one uppercase letter",
    }),
})
