"use client"

import type { Client, Project } from "@/app/types/shared"
import { X, Briefcase, Plus, Receipt, ExternalLink } from "lucide-react"
import { fetchClientProjects } from "./actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientSidebar({
  client,
  onCloseAction,
}: {
  client: Client | null
  onCloseAction: () => void
}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const router = useRouter()

  const activeProjects = projects.filter((p) => p.status === "active")

  useEffect(() => {
    if (!client) {
      setProjects([])
      setLoadingProjects(false)
      return
    }

    let cancelled = false
    async function loadProjects() {
      setLoadingProjects(true)
      try {
        const data = await fetchClientProjects(client!.id)
        if (!cancelled) setProjects(data)
      } catch (error) {
        console.error(error)
        if (!cancelled) setProjects([])
      } finally {
        if (!cancelled) setLoadingProjects(false)
      }
    }

    loadProjects()
    return () => {
      cancelled = true
    }
  }, [client])

  if (!client) return null

  return (
    <div className="drawer-side z-[100]">
      <label
        htmlFor="client-drawer"
        className="drawer-overlay"
        onClick={onCloseAction}
      ></label>

      <div className="w-128 min-h-full bg-base-100 text-base-content shadow-2xl flex flex-col border-l border-base-200">
        {/* HEADER: Name, Status and Controls */}
        <div className="p-6 border-b border-base-200 sticky top-0 bg-base-100 z-10">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight">
                {client.name}
              </h2>
              <div className="badge badge-sm badge-ghost opacity-60 uppercase font-bold tracking-wider">
                {client.status}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                className="btn btn-sm btn-outline border-base-300 gap-2 hover:btn-neutral"
                title="View Details"
              >
                <ExternalLink size={14} />
                Details
              </button>
              <button
                onClick={onCloseAction}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* FINANCIAL SUMMARY: Total Earned */}
          <div className="mt-6 p-4 bg-base-200/50 rounded-2xl border border-base-300/50">
            <p className="text-[10px] uppercase font-black opacity-50 tracking-widest mb-1">
              Total Earned
            </p>
            <p className="text-2xl font-mono font-bold text-base-content">
              0.00{" "}
              <span className="text-sm font-normal opacity-50">
                {client.currency || "USD"}
              </span>
            </p>
          </div>
        </div>

        {/* CONTENT: Active Projects List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">
                Active Projects
              </h3>
            </div>
            <span className="badge badge-sm badge-neutral font-bold">
              {activeProjects.length}
            </span>
          </div>

          {loadingProjects ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-ring loading-lg text-primary/30"></span>
            </div>
          ) : activeProjects.length > 0 ? (
            <div className="grid gap-3">
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  className="group p-4 bg-base-100 rounded-xl border border-base-300 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-bold text-base group-hover:text-primary transition-colors">
                      {p.name}
                    </p>
                    <div className="badge badge-xs badge-outline opacity-40 uppercase">
                      {p.billing_type}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-base-200">
                    <span className="text-[10px] font-bold uppercase opacity-40">
                      Rate
                    </span>
                    <span className="text-sm font-mono font-black">
                      {/* @ts-ignore */}
                      {p.rate || "0.00"}{" "}
                      <span className="text-[10px] font-normal opacity-60">
                        {client.currency}/hr
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-base-200/20 rounded-2xl border-2 border-dashed border-base-300">
              <p className="text-sm opacity-40 italic">No active projects</p>
            </div>
          )}
        </div>

        {/* FOOTER: Actions */}
        <div className="p-6 border-t border-base-200 bg-base-100 sticky bottom-0">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                router.push(`/dashboard/invoices/new?clientId=${client.id}`)
              }
              className="btn btn-outline btn-md font-bold uppercase tracking-tight"
            >
              <Receipt size={18} />
              Invoice
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/projects/new?clientId=${client.id}`)
              }
              className="btn btn-neutral btn-md font-bold uppercase tracking-tight"
            >
              <Plus size={18} />
              Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
