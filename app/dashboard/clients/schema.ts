import { z } from "zod"

export const ClientSchema = z.object({
  name: z.string().min(2, "Client name must be at least 2 characters long."),
  email: z.email("Wrong email format."),
  currency: z.string("Must be a valid currency code."),
})

export type ClientFormValues = z.infer<typeof ClientSchema>
