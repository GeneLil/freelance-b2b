import { createClient } from "@/utils/supabase/server"
import { Tables } from "@/app/types/supabase"

export type Client = Tables<"clients">

export async function getClients(status: string) {
  const supabase = await createClient()

  let query = supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}
