import { z } from "zod"

const ClientBaseSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.email("Invalid email format.").min(1, "Email is required"),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  vat_id: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "archived"]).default("active"),
})

export const CreateClientSchema = ClientBaseSchema
export const UpdateClientSchema = ClientBaseSchema.extend({ id: z.uuid() })

export type CreateClientFormValues = z.infer<typeof CreateClientSchema>
export type UpdateClientFormValues = z.infer<typeof UpdateClientSchema>
