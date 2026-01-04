import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import EditClientForm from "./edit-client-form"
import Link from "next/link"

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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/clients"
          className="text-sm text-gray-500 hover:text-black"
        >
          &larr; Back to Clients
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Client: {client.name}</h1>
        <EditClientForm client={client} />
      </div>
    </div>
  )
}
