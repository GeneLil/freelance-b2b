"use client"

import { useState, useTransition } from "react"
import {
  ChevronRight,
  Calendar,
  Briefcase,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react"
import ClientSidebar from "./client-sidebar"
import { format } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"
import type { Client } from "@/app/types/shared"

type ClientWithProjects = Client & { projectCount: number }

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

export default function ClientListTable({
  clients,
}: {
  clients: ClientWithProjects[]
}) {
  const [selectedClient, setSelectedClient] =
    useState<ClientWithProjects | null>(null)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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

    startTransition(() => {
      router.push(`/dashboard/clients?${params.toString()}`)
    })
  }

  const handleRowClick = (client: ClientWithProjects) => {
    setSelectedClient(client)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div className="drawer drawer-end h-full">
      <input
        id="client-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={closeDrawer}
      />

      <div className="drawer-content">
        <table
          className={`table table-pin-rows w-full transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          <thead className="text-base-content/60 text-xs uppercase tracking-wider shadow-sm">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="bg-base-200 pl-6 font-medium cursor-pointer hover:bg-base-300 hover:text-base-content transition-colors group select-none"
              >
                <div className="flex items-center gap-2">
                  Client{" "}
                  <SortIcon
                    field="name"
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </div>
              </th>

              <th
                onClick={() => handleSort("projects")}
                className="bg-base-200 font-medium cursor-pointer hover:bg-base-300 hover:text-base-content transition-colors group select-none"
              >
                <div className="flex items-center gap-2">
                  Projects{" "}
                  <SortIcon
                    field="projects"
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                </div>
              </th>

              <th
                onClick={() => handleSort("created_at")}
                className="bg-base-200 font-medium cursor-pointer hover:bg-base-300 hover:text-base-content transition-colors group select-none"
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
            {clients.map((client) => (
              <tr
                key={client.id}
                onClick={() => handleRowClick(client)}
                className="group hover:bg-base-200/50 transition-colors cursor-pointer"
              >
                <td className="pl-6">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="font-bold text-sm flex items-center justify-center h-full">
                          {client.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                        {client.name}
                      </div>
                      <div
                        className={`text-[10px] uppercase font-bold tracking-widest mt-0.5 ${
                          client.status === "active"
                            ? "text-success"
                            : "text-base-content/40"
                        }`}
                      >
                        {client.status}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-base-content/70 font-medium">
                    <Briefcase size={16} className="opacity-50" />
                    {client.projectCount}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-base-content/70 text-sm">
                    <Calendar size={14} className="opacity-50" />
                    {client.created_at
                      ? format(new Date(client.created_at), "MMM d, yyyy")
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

      {/* Шторка (Sidebar) */}
      <ClientSidebar client={selectedClient} onCloseAction={closeDrawer} />
    </div>
  )
}
