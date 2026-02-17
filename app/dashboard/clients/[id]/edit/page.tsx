import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import EditClientForm from "./edit-client-form"
import Link from "next/link"
import DangerZone from "./danger-zone"
import { ChevronLeft } from "lucide-react"

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { id } = await params

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single()

  if (!client) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      <div className="mb-6">
        <Link
          href="/dashboard/clients"
          className="btn btn-ghost btn-sm gap-2 pl-0 text-base-content/70 hover:bg-transparent hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} /> Back to Clients
        </Link>
      </div>

      <div className="space-y-8">
        {/* Карточка редактирования */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6 md:p-8">
            <h1 className="text-2xl font-black tracking-tight mb-6">
              Edit Client: {client.name}
            </h1>
            <EditClientForm client={client} />
          </div>
        </div>

        <DangerZone clientId={client.id} clientName={client.name} />
      </div>
    </div>
  )
}
