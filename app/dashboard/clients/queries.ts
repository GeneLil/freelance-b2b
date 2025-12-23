import { createClient } from "@/utils/supabase/server"
import { Tables } from "@/app/types/supabase"

export type Client = Tables<"clients">

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  return data || []
}
