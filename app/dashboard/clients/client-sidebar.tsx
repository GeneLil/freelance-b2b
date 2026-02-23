"use client"

import type { Client, Project } from "@/app/types/shared"
import { X, Briefcase, Plus, Receipt, ArrowRight } from "lucide-react"
import { fetchClientProjects } from "./actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

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

  // Состояние для анимации выхода
  if (!client) {
    return (
      <div className="drawer-side z-[100]">
        <label
          htmlFor="client-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={onCloseAction}
        ></label>
        <div className="p-0 w-[85vw] sm:w-[400px] h-full bg-base-100 flex flex-col transition-transform duration-[400ms] ease-out translate-x-full"></div>
      </div>
    )
  }

  return (
    <div className="drawer-side z-[100]">
      <label
        htmlFor="client-drawer"
        aria-label="close sidebar"
        className="drawer-overlay bg-black/20"
        onClick={onCloseAction}
      />

      <div className="p-0 w-[85vw] sm:w-[400px] h-full bg-base-100 text-base-content flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] transition-transform duration-[400ms] ease-out">
        {/* HEADER: Контрастный якорь */}
        <div className="px-6 pt-6 pb-5 relative">
          <button
            onClick={onCloseAction}
            className="absolute top-6 right-6 p-2 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4 mb-4">
            {/* Якорь: Темный квадрат со скруглениями */}
            <div className="w-14 h-14 rounded-xl bg-neutral text-neutral-content flex items-center justify-center text-xl font-bold shadow-sm shrink-0 mt-1">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div className="pr-8">
              <h2 className="text-xl font-extrabold tracking-tight text-base-content leading-tight">
                {client.name}
              </h2>
              {client.email && (
                <p className="text-sm font-medium text-base-content/50 mt-1 truncate">
                  {client.email}
                </p>
              )}
            </div>
          </div>

          <Link
            href={`/dashboard/clients/${client.id}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-focus transition-colors"
          >
            Open Client Profile
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="h-px bg-gradient-to-r from-base-200 via-base-200 to-transparent"></div>

        {/* BODY: Проекты (Четкие карточки на чистом белом/светлом фоне) */}
        <div className="flex-1 overflow-y-auto p-6 bg-base-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40 flex items-center gap-2">
              <Briefcase size={14} /> Active Projects
            </h3>
            <span className="text-xs font-bold text-base-content/40">
              {activeProjects.length}
            </span>
          </div>

          {loadingProjects ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner text-neutral/30"></span>
            </div>
          ) : activeProjects.length > 0 ? (
            <div className="space-y-3">
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  className="group p-4 rounded-xl border border-base-300 hover:border-neutral/30 hover:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all bg-base-100"
                >
                  <div className="font-bold text-base-content text-sm mb-2 truncate group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50 bg-base-200 px-2 py-1 rounded-md">
                      {p.billing_type}
                    </span>
                    <span className="text-sm font-mono font-bold text-base-content">
                      {p.rate || "0.00"}{" "}
                      <span className="text-xs font-sans font-medium text-base-content/40">
                        {client.currency || "USD"}/hr
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 rounded-xl border border-dashed border-base-300 bg-base-50">
              <p className="text-sm font-medium text-base-content/40">
                No active projects
              </p>
            </div>
          )}
        </div>

        {/* FOOTER: Акцентные кнопки */}
        <div className="p-6 border-t border-base-200 bg-base-50 shrink-0">
          <div className="flex gap-3">
            <button
              onClick={() =>
                router.push(`/dashboard/invoices/new?clientId=${client.id}`)
              }
              className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content flex-1 font-bold shadow-sm"
            >
              <Receipt size={16} className="opacity-70" />
              Invoice
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/projects/new?clientId=${client.id}`)
              }
              className="btn btn-neutral flex-1 font-bold shadow-md"
            >
              <Plus size={16} />
              Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
