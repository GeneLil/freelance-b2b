import { z } from "zod"

export const ProjectSchema = z.object({
  client_id: z.string().uuid("Please select a client"),
  name: z.string().min(2, "Project name is too short"),
  billing_type: z.enum(["hourly", "fixed"]),
  rate: z.coerce.number().optional(),
  currency: z.string().default("USD"),
  payment_terms: z.coerce.number().default(14),
  status: z.string().default("active"),
  description: z.string().optional(),
})

export const CreateProjectSchema = ProjectSchema
export const UpdateProjectSchema = ProjectSchema.extend({ id: z.uuid() })

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>
export type UpdateProjectFormValues = z.infer<typeof UpdateProjectSchema>
