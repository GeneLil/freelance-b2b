"use client"

import type { Client, Project } from "@/app/types/shared"
import { X, Briefcase, Clock, Plus, Receipt } from "lucide-react"
import { fetchClientProjects } from "./actions"
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

  const activeProjects = projects.filter((p) => p.status === "active")
  const historyProjects = projects.filter((p) => p.status !== "active")

  useEffect(() => {
    if (!client) {
      setProjects([])
      setLoadingProjects(false)
      return
    }

    let cancelled = false

    async function loadProjects() {
      if (!client) return
      setLoadingProjects(true)
      try {
        const data = await fetchClientProjects(client.id)
        if (!cancelled) {
          setProjects(data)
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setProjects([])
        }
      } finally {
        if (!cancelled) {
          setLoadingProjects(false)
        }
      }
    }

    loadProjects()

    return () => {
      cancelled = true
    }
  }, [client])

  if (!client) {
    return null
  }

  return (
    <div className="drawer-side z-[100]">
      <label htmlFor="client-drawer" className="drawer-overlay"></label>

      <div className="p-0 w-96 min-h-full bg-base-100 text-base-content shadow-2xl flex flex-col border-l border-base-200">
        <div className="p-6 border-b border-base-200 flex justify-between items-center sticky top-0 bg-base-100 z-10">
          <div>
            <h2 className="text-xl font-extrabold">{client.name}</h2>
            <div className="badge badge-outline badge-xs opacity-50 uppercase">
              {client.status}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost border-base-300">
              Edit
            </button>
            <button
              onClick={onCloseAction}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
          <div className="stats shadow w-full border border-base-200 bg-base-100">
            <div className="stat p-4">
              <div className="stat-title text-[10px] font-bold uppercase">
                Earned
              </div>
              <div className="stat-value text-lg text-success">
                0.00{" "}
                <span className="text-xs font-normal opacity-50">
                  {client.currency || "USD"}
                </span>
              </div>
            </div>
            <div className="stat p-4 border-l border-base-200">
              <div className="stat-title text-[10px] font-bold uppercase">
                Pending
              </div>
              <div className="stat-value text-lg text-warning">
                0.00{" "}
                <span className="text-xs font-normal opacity-50">
                  {client.currency || "USD"}
                </span>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-xl">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-sm font-bold flex items-center gap-2">
              <Briefcase size={16} className="opacity-50" /> Active Projects
            </div>
            <div className="collapse-content space-y-3">
              {loadingProjects ? (
                <div className="flex justify-center p-4">
                  <span className="loading loading-spinner loading-md text-primary"></span>
                </div>
              ) : activeProjects.length > 0 ? (
                activeProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-base-100 rounded-lg border border-base-300"
                  >
                    <p className="font-bold text-sm">{p.name}</p>
                    <div className="flex justify-between mt-2 text-[10px] opacity-60">
                      <span className="flex items-center gap-1 uppercase">
                        <Clock size={10} /> {p.billing_type}
                      </span>
                      {p.billing_type === "hourly" && (
                        <span>0 hrs tracked</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs opacity-50 text-center py-2">
                  No active projects
                </p>
              )}
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-xl">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-bold flex items-center gap-2 text-base-content/50">
              <Clock size={16} /> History
            </div>
            <div className="collapse-content">
              {historyProjects.length > 0 ? (
                historyProjects.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between py-2 border-b border-base-300 last:border-0 text-xs"
                  >
                    <span>{p.name}</span>
                    <span className="font-mono opacity-50">Closed</span>
                  </div>
                ))
              ) : (
                <p className="text-xs opacity-40 text-center py-2">
                  History is empty
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-base-200 bg-base-100 sticky bottom-0">
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-outline btn-sm gap-2">
              <Receipt size={14} /> Invoice
            </button>
            <button className="btn btn-neutral btn-sm gap-2">
              <Plus size={14} /> Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
