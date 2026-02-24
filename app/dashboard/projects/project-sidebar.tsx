"use client"

import {
  X,
  Play,
  Square,
  Receipt,
  ArrowRight,
  DollarSign,
  Building2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { ProjectWithClients } from "@/app/dashboard/projects/queries"

export default function ProjectSidebar({
  project,
  onCloseAction,
}: {
  project: ProjectWithClients | null
  onCloseAction: () => void
}) {
  const router = useRouter()

  const isTimerRunning = false
  const trackedHours = "12:30"
  const earnedAmount = project?.rate ? Number(project.rate) * 12.5 : 0
  const paidAmount = 0

  if (!project) {
    return (
      <div className="drawer-side z-[100]">
        <label
          htmlFor="project-drawer"
          aria-label="close sidebar"
          className="drawer-overlay bg-black/20"
          onClick={onCloseAction}
        ></label>
        <div className="p-0 w-[85vw] sm:w-[400px] h-full bg-base-100 flex flex-col transition-transform duration-[400ms] ease-out translate-x-full"></div>
      </div>
    )
  }

  return (
    <div className="drawer-side z-[100]">
      <label
        htmlFor="project-drawer"
        aria-label="close sidebar"
        className="drawer-overlay bg-black/20"
        onClick={onCloseAction}
      ></label>

      <div className="p-0 w-[85vw] sm:w-[400px] h-full bg-base-100 text-base-content flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] transition-transform duration-[400ms] ease-out">
        <div className="px-6 pt-6 pb-5 relative">
          <button
            onClick={onCloseAction}
            className="absolute cursor-pointer top-6 right-6 p-2 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="pr-8 mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`w-2 h-2 rounded-full ${project.status === "active" ? "bg-success" : "bg-base-content/30"}`}
              ></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50">
                {project.billing_type}
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-base-content leading-tight mb-2">
              {project.name}
            </h2>
            <Link
              href={`/dashboard/clients/${project.client_id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-primary transition-colors"
            >
              <Building2 size={14} />
              {project.clients?.name || "Unknown Client"}
            </Link>
          </div>

          <Link
            href={`/dashboard/projects/${project.id}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-focus transition-colors"
          >
            Open Project Profile
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="h-px bg-gradient-to-r from-base-200 via-base-200 to-transparent"></div>

        <div className="flex-1 overflow-y-auto bg-base-50 p-6 space-y-6">
          <div className="bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1">
                Time Tracked
              </div>
              <div className="text-2xl font-mono font-bold text-base-content tracking-tight">
                {trackedHours}
              </div>
            </div>
            <button
              className={`btn btn-circle btn-lg shadow-md ${isTimerRunning ? "btn-error text-white" : "btn-neutral"}`}
            >
              {isTimerRunning ? (
                <Square size={20} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>
          </div>

          {/* БЛОК 2: Финансовая сводка */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-100 p-4 rounded-2xl border border-base-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                <DollarSign size={14} /> Earned
              </div>
              <div className="text-lg font-bold text-base-content">
                {project.currency}{" "}
                {earnedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-[10px] text-base-content/50 mt-1 font-medium">
                Rate: {project.rate}/
                {project.billing_type === "hourly" ? "hr" : "fixed"}
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-2xl border border-base-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                <Receipt size={14} /> Paid
              </div>
              <div className="text-lg font-bold text-success">
                {project.currency}{" "}
                {paidAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-[10px] text-base-content/50 mt-1 font-medium">
                Pending: {project.currency} {earnedAmount - paidAmount}
              </div>
            </div>
          </div>

          {project.description && (
            <div>
              <h3 className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed bg-base-100 p-4 rounded-2xl border border-base-200 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-base-200 bg-base-100 shrink-0">
          <button
            onClick={() =>
              router.push(`/dashboard/invoices/new?projectId=${project.id}`)
            }
            className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content w-full font-bold shadow-sm"
          >
            <Receipt size={16} className="opacity-70" />
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
