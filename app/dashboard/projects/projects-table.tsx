"use client"

import { useState, useTransition } from "react"
import {
  ChevronRight,
  Calendar,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react"
import { format } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"
import type { ProjectWithClients } from "./queries"
import ProjectSidebar from "./project-sidebar"

const SortIcon = ({
  field,
  currentSort,
  currentOrder,
}: {
  field: string
  currentSort: string
  currentOrder: string
}) => {
  if (currentSort !== field)
    return (
      <ArrowUpDown
        size={14}
        className="opacity-30 group-hover:opacity-100 transition-opacity"
      />
    )
  return currentOrder === "asc" ? (
    <ArrowUp size={14} className="text-primary" />
  ) : (
    <ArrowDown size={14} className="text-primary" />
  )
}

export default function ProjectListTable({
  projects,
}: {
  projects: ProjectWithClients[]
}) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithClients | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSort = searchParams.get("sort") || "created_at"
  const currentOrder = searchParams.get("order") || "desc"

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentSort === field) {
      params.set("order", currentOrder === "asc" ? "desc" : "asc")
    } else {
      params.set("sort", field)
      params.set("order", "asc")
    }
    startTransition(() =>
      router.push(`/dashboard/projects?${params.toString()}`),
    )
  }

  return (
    <div className="drawer drawer-end h-full">
      <input
        id="project-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={!!selectedProject}
        onChange={() => setSelectedProject(null)}
      />

      <div className="drawer-content">
        <table
          className={`table table-pin-rows w-full transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          <thead className="text-base-content/60 text-xs uppercase tracking-wider shadow-sm">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="bg-base-200 pl-6 font-medium cursor-pointer hover:bg-base-300 transition-colors group select-none"
              >
                <div className="flex items-center gap-2">
                  Project{" "}
                  <SortIcon
                    field="name"
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </div>
              </th>
              <th className="bg-base-200 font-medium select-none">Billing</th>
              <th
                onClick={() => handleSort("rate")}
                className="bg-base-200 font-medium cursor-pointer hover:bg-base-300 transition-colors group select-none"
              >
                <div className="flex items-center gap-2">
                  Rate{" "}
                  <SortIcon
                    field="rate"
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </div>
              </th>
              <th
                onClick={() => handleSort("created_at")}
                className="bg-base-200 font-medium cursor-pointer hover:bg-base-300 transition-colors group select-none"
              >
                <div className="flex items-center gap-2">
                  Added{" "}
                  <SortIcon
                    field="created_at"
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </div>
              </th>
              <th className="bg-base-200 w-10"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-200">
            {projects.map((project) => (
              <tr
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group hover:bg-base-200/50 transition-colors cursor-pointer"
              >
                <td className="pl-6">
                  <div>
                    <div className="font-bold text-base-content group-hover:text-primary transition-colors text-sm">
                      {project.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-base-content/60">
                        {project.clients?.name || "Unknown Client"}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${project.status === "active" ? "bg-success" : "bg-base-content/30"}`}
                      ></span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-sm badge-ghost font-medium uppercase tracking-wider text-[10px]">
                    {project.billing_type}
                  </span>
                </td>

                <td>
                  <div className="text-sm font-mono font-bold text-base-content">
                    {project.rate || "0.00"}
                    <span className="text-xs font-sans font-medium text-base-content/40 ml-1">
                      {project.currency}{" "}
                      {project.billing_type === "hourly" ? "/hr" : ""}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-base-content/70 text-sm">
                    <Calendar size={14} className="opacity-50" />
                    {project.created_at
                      ? format(new Date(project.created_at), "MMM d, yyyy")
                      : "—"}
                  </div>
                </td>

                <td className="pr-6 text-right">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                    <ChevronRight size={20} className="text-primary" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectSidebar
        project={selectedProject}
        onCloseAction={() => setSelectedProject(null)}
      />
    </div>
  )
}
