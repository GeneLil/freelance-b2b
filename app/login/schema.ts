import { z } from "zod"

export const LoginSchema = z.object({
  email: z.email("Wrong email format."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
