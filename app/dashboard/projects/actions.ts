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
