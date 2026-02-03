"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  CreateClientSchema,
  CreateClientFormValues,
  UpdateClientFormValues,
  UpdateClientSchema,
} from "./schema"
import { createClient } from "@/utils/supabase/server"

export async function createClientAction(formData: CreateClientFormValues) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return { error: "Unauthorized" }
  }

  const validatedFields = CreateClientSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { error: "Validation error" }
  }

  const { name, email, status } = validatedFields.data

  if (!name) {
    return { error: "Client's name is required" }
  }

  const { error } = await supabase.from("clients").insert({
    user_id: user.id,
    name,
    email,
    status,
  })

  if (error) {
    if (error.code === "23505") {
      return { error: "Client with this email already exists" }
    }

    console.error(error)
    return { error: "Failed to create client. Please try again." }
  }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}

export async function updateClientAction(formData: UpdateClientFormValues) {
  const supabase = await createClient()

  const validatedFields = UpdateClientSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { error: "Validation error" }
  }

  const { name, email, status, id } = validatedFields.data

  const { error } = await supabase
    .from("clients")
    .update({ name, status, email })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}
