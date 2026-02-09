import { createClient } from "@/utils/supabase/server"

export async function getPaginatedClients({
  status,
  search,
  page = 1,
  limit = 10,
}: {
  status: string
  search?: string
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

  const { data, error, count } = await query

  if (error) throw error

  return {
    clients: data || [],
    totalCount: count || 0,
  }
}

export async function getAllActiveClients() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .select("id, name")
    .eq("status", "active")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching clients list:", error)
    return []
  }

  return data
}

export async function getClientProjects(clientId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}
