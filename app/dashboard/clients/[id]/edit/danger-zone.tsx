"use client"

import { useState } from "react"
import { deleteClientAction } from "@/app/dashboard/clients/actions"
import { Trash2, AlertTriangle } from "lucide-react"

export default function DangerZone({
  clientId,
  clientName,
}: {
  clientId: string
  clientName: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete client "${clientName}"?\n\nThis action cannot be undone and will delete all associated PROJECTS and INVOICES.`,
    )

    if (confirmed) {
      setIsDeleting(true)
      const result = await deleteClientAction(clientId)
      if (result?.error) {
        alert(result.error)
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="card bg-red-50 border border-red-200 shadow-sm mt-8">
      <div className="card-body p-6 md:p-8 flex-row items-start justify-between gap-6 flex-wrap md:flex-nowrap">
        <div className="space-y-2">
          <h3 className="text-red-900 font-bold flex items-center gap-2">
            <AlertTriangle size={20} /> Danger Zone
          </h3>
          <p className="text-sm text-red-800/80 max-w-lg">
            Deleting this client is irreversible. It will permanently remove
            <span className="font-bold"> {clientName}</span> along with all
            their projects, invoices, and history.
          </p>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn btn-error btn-outline hover:btn-error w-full md:w-auto text-red-700 hover:text-white"
        >
          {isDeleting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Trash2 size={16} />
          )}
          Delete Client
        </button>
      </div>
    </div>
  )
}
