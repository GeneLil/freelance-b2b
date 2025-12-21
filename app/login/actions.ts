"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { LoginSchema, LoginFormValues } from "./schema"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function loginAction(values: LoginFormValues) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Validation error" }
  }

  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

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
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")

  redirect("/")
}
