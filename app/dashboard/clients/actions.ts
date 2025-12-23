"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getRequiredUser } from "@/utils/supabase/get-user"
import {
  type ClientFormValues,
  ClientSchema,
} from "@/app/dashboard/clients/schema"

export async function createClientAction(formData: ClientFormValues) {
  const user = await getRequiredUser()

  if (!user) {
    return { error: "Not authorized" }
  }

  const validatedFields = ClientSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { error: "Validation error" }
  }

  const { name, email, currency } = validatedFields.data

  if (!name) {
    return { error: "Client's name is required" }
  }

  const supabase = await createClient()

  console.log(user)
  const { error } = await supabase
    .from("clients")
    .insert([{ name, email, currency, user_id: user.id }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}
