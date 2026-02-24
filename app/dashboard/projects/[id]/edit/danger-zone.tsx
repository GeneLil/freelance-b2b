"use client"

import { useState } from "react"
import { deleteProjectAction } from "@/app/dashboard/projects/actions"
import { Trash2, AlertTriangle } from "lucide-react"

export default function DangerZone({
  projectId,
  projectName,
}: {
  projectId: string
  projectName: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete project "${projectName}"?\n\nThis action cannot be undone and will delete all associated INVOICES and TIME LOGS.`,
    )

    if (confirmed) {
      setIsDeleting(true)
      const result = await deleteProjectAction(projectId)
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
            Deleting this project is irreversible. It will permanently remove
            <span className="font-bold"> {projectName}</span> along with all its
            time entries and invoices.
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
          Delete Project
        </button>
      </div>
    </div>
  )
}
