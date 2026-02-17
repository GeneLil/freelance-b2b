import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import type { ClientFullProfile } from "@/app/types/shared"

export async function getClientFullProfile(
  clientId: string,
): Promise<ClientFullProfile> {
  const supabase = await createClient()

  const [clientRes, projectsRes, invoicesRes, historyRes] = await Promise.all([
    supabase.from("clients").select("*").eq("id", clientId).single(),

    supabase
      .from("projects")
      .select("*")
      .eq("client_id", clientId)
      .eq("status", "active")
      .order("created_at", { ascending: false }),

    supabase
      .from("invoices")
      .select("*")
      .eq("client_id", clientId)
      .order("due_date", { ascending: false }),

    supabase
      .from("client_history")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(20),
  ])

  if (clientRes.error || !clientRes.data) {
    return notFound()
  }

  const invoices = invoicesRes.data || []

  const financials = invoices.reduce(
    (acc, inv) => {
      const amount = Number(inv.amount) || 0

      acc.totalBilled += amount

      if (inv.status === "paid") {
        acc.paid += amount
      }

      if (["sent", "overdue"].includes(inv.status)) {
        acc.outstanding += amount
      }

      return acc
    },
    { totalBilled: 0, paid: 0, outstanding: 0 },
  )

  return {
    client: clientRes.data,
    projects: projectsRes.data || [],
    invoices: invoices,
    history: historyRes.data || [],
    financials,
  }
}
