"use client"

import {
  Briefcase,
  Play,
  Pause,
  Receipt,
  AlertCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import type {
  ClientFullProfile,
  Invoice,
  Project,
  ClientEvent,
} from "@/app/types/shared"

export default function ClientWorkArea({
  projects,
  invoices,
  history,
  financials,
  client,
}: ClientFullProfile) {
  const unpaidInvoices = invoices.filter((inv: Invoice) =>
    ["sent", "overdue"].includes(inv.status),
  )

  const { currency, id: clientId } = client

  return (
    <>
      {/* 1. FINANCIAL SUMMARY */}
      <div className="stats shadow w-full border border-base-200 bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <Receipt size={32} className="opacity-20" />
          </div>
          <div className="stat-title text-xs font-bold uppercase tracking-wider opacity-60">
            Total Billed
          </div>
          <div className="stat-value text-primary text-3xl">
            {financials.totalBilled.toLocaleString()}{" "}
            <span className="text-sm font-normal opacity-50">{currency}</span>
          </div>
          <div className="stat-desc">Lifetime value</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <Briefcase size={32} className="opacity-20" />
          </div>
          <div className="stat-title text-xs font-bold uppercase tracking-wider opacity-60">
            Paid
          </div>
          <div className="stat-value text-success text-3xl">
            {financials.paid.toLocaleString()}{" "}
            <span className="text-sm font-normal opacity-50">{currency}</span>
          </div>
          <div className="stat-desc">Received payments</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <AlertCircle size={32} className="opacity-20" />
          </div>
          <div className="stat-title text-xs font-bold uppercase tracking-wider opacity-60">
            Outstanding
          </div>
          <div className="stat-value text-warning text-3xl">
            {financials.outstanding.toLocaleString()}{" "}
            <span className="text-sm font-normal opacity-50">{currency}</span>
          </div>
          <div className="stat-desc text-warning font-bold">
            Needs attention
          </div>
        </div>
      </div>

      {/* 2. ACTIONS BAR */}
      <div className="flex gap-4">
        <Link
          href={`/dashboard/projects/new?clientId=${clientId}`}
          className="btn btn-neutral flex-1 shadow-sm"
        >
          + New Project
        </Link>
        <Link
          href={`/dashboard/invoices/new?clientId=${clientId}`}
          className="btn btn-outline flex-1 shadow-sm bg-base-100"
        >
          <Receipt size={18} /> Create Invoice
        </Link>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-primary" /> Active Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length > 0 ? (
            projects.map((project: Project) => {
              const isTimerRunning = false

              return (
                <div
                  key={project.id}
                  className="card bg-base-100 border border-base-200 shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="card-body p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="card-title text-base">{project.name}</h4>
                      <div className="badge badge-sm badge-outline uppercase text-[10px]">
                        {project.billing_type}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-xs opacity-50 uppercase font-bold">
                          Rate
                        </p>
                        <p className="font-mono font-bold">
                          {project.rate || 0} {currency}/hr
                        </p>
                      </div>

                      <button
                        className={`btn btn-circle btn-sm text-white shadow-lg ${
                          isTimerRunning
                            ? "btn-error shadow-error/30"
                            : "btn-primary shadow-primary/30"
                        }`}
                      >
                        {isTimerRunning ? (
                          <Pause size={14} fill="currentColor" />
                        ) : (
                          <Play size={14} fill="currentColor" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-2 p-8 border border-dashed border-base-300 rounded-xl text-center">
              <p className="opacity-50 text-sm">No active projects found.</p>
            </div>
          )}
        </div>
      </div>

      {unpaidInvoices.length > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-xl overflow-hidden">
          <div className="p-4 bg-warning/20 flex justify-between items-center">
            <h3 className="text-warning-content font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
              <AlertCircle size={16} /> Unpaid Invoices
            </h3>
          </div>
          <div className="divide-y divide-warning/10">
            {unpaidInvoices.map((inv: Invoice) => (
              <div
                key={inv.id}
                className="p-4 flex justify-between items-center hover:bg-white/40 transition"
              >
                <div>
                  <div className="font-bold text-sm">{inv.invoice_number}</div>
                  <div className="text-xs opacity-60">
                    Due:{" "}
                    {inv.due_date
                      ? format(new Date(inv.due_date), "MMM d, yyyy")
                      : "N/A"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">
                    {inv.amount} {currency}
                  </div>
                  <div className="badge badge-xs badge-warning uppercase mt-1">
                    {inv.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 opacity-60">
          <Clock size={20} /> History
        </h3>

        <div className="relative border-l-2 border-base-200 ml-3 space-y-6 pb-4">
          {history.length > 0 ? (
            history.map((event: ClientEvent) => (
              <div key={event.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-base-100 border-2 border-base-300"></div>

                <div className="text-xs font-mono opacity-40 mb-1">
                  {format(new Date(event.created_at), "MMM d, yyyy 'at' HH:mm")}
                </div>
                <div className="font-bold text-sm text-base-content">
                  {event.title}
                </div>
                {event.description && (
                  <div className="text-xs opacity-60 mt-0.5">
                    {event.description}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="pl-6 text-sm opacity-40 italic">
              No history events yet.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
