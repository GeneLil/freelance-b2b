"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { LoginSchema, LoginFormValues } from "./schema"
import { revalidatePath } from "next/cache"

export async function loginAction(values: LoginFormValues) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Validation error" }
  }

  const supabase = await createClient()

  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}

export async function logoutAction() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")

  redirect("/")
}
