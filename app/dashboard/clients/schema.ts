import { z } from "zod"

const ClientBaseSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.email("Invalid email format."),
  currency: z.enum(["USD", "EUR"]),
  status: z.enum(["active", "archived"]).default("active"),
})

export const CreateClientSchema = ClientBaseSchema
export const UpdateClientSchema = ClientBaseSchema.extend({ id: z.uuid() })

export type CreateClientFormValues = z.infer<typeof CreateClientSchema>
export type UpdateClientFormValues = z.infer<typeof UpdateClientSchema>
