import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import EditProjectForm from "./edit-project-form"
import Link from "next/link"
import DangerZone from "./danger-zone"
import { ChevronLeft } from "lucide-react"
import { getAllActiveClients } from "@/app/dashboard/clients/queries"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { id } = await params

  const clients = await getAllActiveClients()

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (!project) {
    notFound()
  }

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

      <div className="space-y-8">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6 md:p-8">
            <h1 className="text-2xl font-black tracking-tight mb-6">
              Edit Project: {project.name}
            </h1>
            <EditProjectForm project={project} clients={clients} />
          </div>
        </div>

        <DangerZone projectId={project.id} projectName={project.name} />
      </div>
    </div>
  )
}
