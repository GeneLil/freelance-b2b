import { getPaginatedProjects } from "./queries"
import Link from "next/link"
import Pagination from "../clients/pagination" // используем готовый
import ProjectFilters from "./project-filters"
import { Briefcase, Clock, DollarSign, ExternalLink } from "lucide-react"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string
    type?: string
    search?: string
    page?: string
  }>
}) {
  const resolvedParams = await searchParams
  const page = Number(resolvedParams.page) || 1

  const { projects, totalCount } = await getPaginatedProjects({
    status: resolvedParams.status || "all",
    type: resolvedParams.type || "all",
    search: resolvedParams.search || "",
    page,
    limit: 10,
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Projects
          </h1>
          <p className="text-sm text-gray-500">
            Track your work and billing methods
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition shadow-sm"
        >
          + Add Project
        </Link>
      </div>

      <ProjectFilters />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Project / Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Billing Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No projects found matching your criteria.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 group transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.clients?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {project.billing_type === "hourly" ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                          <Clock size={12} /> Hourly
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                          <DollarSign size={12} /> Fixed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {project.billing_type === "hourly"
                        ? `${project.hourly_rate}/${project.currency === "USD" ? "hr" : "ч"}`
                        : project.fixed_price}
                      <span className="ml-1 text-gray-400 font-normal">
                        {project.currency}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status === "active" ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/projects/${project.id}/edit`}
                      className="text-gray-400 hover:text-black transition-colors"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
