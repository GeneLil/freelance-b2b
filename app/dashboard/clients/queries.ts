import { createClient } from "@/utils/supabase/server"
import { Tables } from "@/app/types/supabase"

export type Client = Tables<"clients">

export async function getClients({
  status,
  search,
  currency,
  page = 1,
  limit = 10,
}: {
  status: string
  search?: string
  currency?: string
  page?: number
  limit?: number
}) {
  const supabase = await createClient()

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from("clients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (status && status !== "all") query = query.eq("status", status)
  if (search) query = query.ilike("name", `%${search}%`)
  if (currency && currency !== "all") query = query.eq("currency", currency)

  const { data, error, count } = await query

  if (error) throw error

  return {
    clients: data || [],
    totalCount: count || 0,
  }
}
