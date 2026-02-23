import { createClient } from "@/utils/supabase/server"

export async function getPaginatedProjects({
  status = "all",
  type = "all",
  search = "",
  page = 1,
  limit = 10,
}) {
  const supabase = await createClient()
  const from = (page - 1) * limit

  const { data, error } = await supabase.rpc("get_projects_list", {
    search_term: search,
    status_filter: status,
    type_filter: type,
    page_offset: from,
    page_limit: limit,
  })

  if (error) throw error

  const projects = (data || []).map((row) => ({
    id: row.id,
    client_id: row.client_id,
    name: row.name,
    status: row.status,
    rate: row.rate,
    created_at: row.created_at,
    billing_type: row.billing_type,
    currency: row.currency,
    description: row.description,
    payment_terms: row.payment_terms,
    archived_at: row.archived_at,
    user_id: row.user_id,
    clients: {
      name: row.client_name,
    },
  }))

  const totalCount = data && data.length > 0 ? Number(data[0].total_count) : 0

  return {
    projects,
    totalCount,
  }
}
