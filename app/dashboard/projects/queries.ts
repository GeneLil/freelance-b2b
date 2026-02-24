import { createClient } from "@/utils/supabase/server"
import type { Project } from "@/app/types/shared"

export type ProjectWithClients = Project & { clients: { name: string } }
export async function getPaginatedProjects({
  status = "all",
  type = "all",
  search = "",
  sort = "created_at",
  order = "desc",
  page = 1,
  limit = 10,
}) {
  const supabase = await createClient()

  let query = supabase.from("projects").select("*, clients(name)")

  if (status && status !== "all") query = query.eq("status", status)
  if (type && type !== "all") query = query.eq("billing_type", type)

  const { data, error } = await query
  if (error) throw error

  let projects: ProjectWithClients[] = data || []

  if (search) {
    const term = search.toLowerCase()
    projects = projects.filter(
      (p: ProjectWithClients) =>
        p.name?.toLowerCase().includes(term) ||
        p.clients?.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term),
    )
  }

  projects.sort((a: ProjectWithClients, b: ProjectWithClients) => {
    if (sort === "name") {
      const nameA = a.name?.toLowerCase() || ""
      const nameB = b.name?.toLowerCase() || ""
      return order === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    } else if (sort === "rate") {
      const rateA = Number(a.rate) || 0
      const rateB = Number(b.rate) || 0
      return order === "asc" ? rateA - rateB : rateB - rateA
    } else {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return order === "asc" ? dateA - dateB : dateB - dateA
    }
  })

  const totalCount = projects.length
  const from = (page - 1) * limit
  const to = from + limit
  const paginatedProjects = projects.slice(from, to)

  return {
    projects: paginatedProjects,
    totalCount,
  }
}
