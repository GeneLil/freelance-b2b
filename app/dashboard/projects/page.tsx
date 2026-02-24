import { getPaginatedProjects } from "./queries"
import Link from "next/link"
import Pagination from "@/app/dashboard/components/pagination" // Проверь правильность пути!
import ProjectFilters from "./project-filters"
import ProjectListTable from "./projects-table"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string
    type?: string
    search?: string
    sort?: string
    order?: string
    page?: string
    limit?: string
  }>
}) {
  const resolvedParams = await searchParams
  const page = Number(resolvedParams.page) || 1
  const limit = Number(resolvedParams.limit) || 10
  const sort = resolvedParams.sort || "created_at"
  const order = resolvedParams.order || "desc"

  const { projects, totalCount } = await getPaginatedProjects({
    status: resolvedParams.status || "all",
    type: resolvedParams.type || "all",
    search: resolvedParams.search || "",
    sort,
    order,
    page,
    limit,
  })

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            Projects
          </h1>
          <p className="text-sm text-base-content/60">
            Track your active work and budgets
          </p>
        </div>
        <Link href="/dashboard/projects/new" className="btn btn-neutral">
          + Add Project
        </Link>
      </div>

      <ProjectFilters />

      <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-220px)] min-h-[400px]">
        <div className="flex-1 overflow-auto relative">
          {projects.length === 0 ? (
            <div className="p-12 text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium opacity-50 mb-2">
                No projects found
              </h3>
              <p className="text-sm opacity-40">
                Adjust your filters or create a new project.
              </p>
            </div>
          ) : (
            <ProjectListTable projects={projects} />
          )}
        </div>

        <div className="border-t border-base-200 bg-base-50 shrink-0 z-20">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
