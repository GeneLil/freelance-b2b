import { createClient } from "@/utils/supabase/server"
import type { Client } from "@/app/types/shared"

export async function getPaginatedClients({
  status,
  search,
  sort = "created_at",
  order = "desc",
  page = 1,
  limit = 10,
}: {
  status: string
  search?: string
  sort?: string
  order?: string
  page?: number
  limit?: number
}) {
  const supabase = await createClient()

  // 1. ЗАПРАШИВАЕМ ВСЕХ КЛИЕНТОВ (БЕЗ .range и .order)
  let query = supabase.from("clients").select("*, projects(count)")

  if (status && status !== "all") query = query.eq("status", status)
  if (search) query = query.ilike("name", `%${search}%`)

  const { data, error } = await query

  if (error) throw error

  // 2. Добавляем projectCount к каждому объекту для удобной сортировки
  const clients = (data || []).map(
    (c: Client & { projects: { count: number }[] }) => ({
      ...c,
      projectCount: c.projects[0]?.count || 0,
    }),
  )

  // 3. СОРТИРУЕМ ВЕСЬ МАССИВ В ПАМЯТИ
  clients.sort((a, b) => {
    if (sort === "name") {
      const nameA = a.name?.toLowerCase() || ""
      const nameB = b.name?.toLowerCase() || ""
      return order === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    } else if (sort === "projects") {
      // Сортировка по количеству проектов
      return order === "asc"
        ? a.projectCount - b.projectCount
        : b.projectCount - a.projectCount
    } else {
      // По умолчанию: по дате добавления
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return order === "asc" ? dateA - dateB : dateB - dateA
    }
  })

  // 4. ПРИМЕНЯЕМ ПАГИНАЦИЮ К УЖЕ ОТСОРТИРОВАННОМУ СПИСКУ
  const totalCount = clients.length
  const from = (page - 1) * limit
  const to = from + limit

  // Отрезаем нужный кусок (10 штук) для текущей страницы
  const paginatedClients = clients.slice(from, to)

  return {
    clients: paginatedClients,
    totalCount,
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
