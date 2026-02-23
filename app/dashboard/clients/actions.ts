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
import { getClientProjects } from "./queries"

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
    console.error("Validation error:", validatedFields.error)
    return { error: "Please fill in all required fields correctly." }
  }

  const { name, email, phone, address, vat_id, notes, status } =
    validatedFields.data

  const { error } = await supabase.from("clients").insert({
    user_id: user.id,
    name,
    email,
    phone: phone || null,
    address: address || null,
    vat_id: vat_id || null,
    notes: notes || null,
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
    console.error("Validation error:", validatedFields.error)
    return { error: "Validation error. Check your input." }
  }

  const { id, name, email, phone, address, vat_id, notes, status } =
    validatedFields.data

  const { error } = await supabase
    .from("clients")
    .update({
      name,
      email,
      phone: phone || null,
      address: address || null,
      vat_id: vat_id || null,
      notes: notes || null,
      status,
    })
    .eq("id", id)

  if (error) {
    console.error("Update error:", error)
    return { error: "Failed to update client." }
  }

  revalidatePath("/dashboard/clients")
  revalidatePath(`/dashboard/clients/${id}`)
  redirect(`/dashboard/clients/${id}`)
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

export async function fetchClientProjects(clientId: string) {
  return await getClientProjects(clientId)
}
