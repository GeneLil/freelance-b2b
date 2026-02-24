import NewProjectForm from "./new-project-form"
import { getAllActiveClients } from "@/app/dashboard/clients/queries"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>
}) {
  const clients = await getAllActiveClients()
  const resolvedParams = await searchParams
  const defaultClientId = resolvedParams.clientId

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      <div className="mb-6">
        <Link
          href="/dashboard/projects"
          className="btn btn-ghost btn-sm gap-2 pl-0 text-base-content/70 hover:bg-transparent hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} /> Back to Projects
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <h1 className="text-2xl font-black tracking-tight mb-6">
            Create New Project
          </h1>
          <NewProjectForm clients={clients} defaultClientId={defaultClientId} />
        </div>
      </div>
    </div>
  )
}
