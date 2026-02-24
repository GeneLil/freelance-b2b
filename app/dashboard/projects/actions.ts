"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CreateProjectFormValues, CreateProjectSchema } from "./schema"

export async function createProjectAction(data: CreateProjectFormValues) {
  const supabase = await createClient()

  const validated = CreateProjectSchema.safeParse(data)
  if (!validated.success) return { error: "Invalid fields" }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("projects").insert({
    ...validated.data,
    user_id: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath("/dashboard/projects")
  redirect("/dashboard/projects")
}

export async function updateProjectAction(payload: {
  id: string
  client_id: string
  name: string
  description?: string
  billing_type: "hourly" | "fixed"
  rate: number
  currency: string
  status: string
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("projects")
    .update({
      client_id: payload.client_id,
      name: payload.name,
      description: payload.description || null,
      billing_type: payload.billing_type,
      rate: payload.rate,
      currency: payload.currency,
      status: payload.status,
    })
    .eq("id", payload.id)

  if (error) {
    console.error("Error updating project:", error)
    return { error: error.message || "Failed to update project." }
  }

  revalidatePath("/dashboard/projects")
  revalidatePath(`/dashboard/projects/${payload.id}`)
  revalidatePath("/dashboard/clients")
  revalidatePath(`/dashboard/clients/${payload.client_id}`)

  redirect(`/dashboard/projects/${payload.id}`)
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error("Error deleting project:", error)
    return { error: error.message || "Failed to delete project." }
  }

  revalidatePath("/dashboard/projects")
  revalidatePath("/dashboard/clients")

  redirect("/dashboard/projects")
}
