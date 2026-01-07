"use client"

import { useState } from "react"
import { deleteClientAction } from "@/app/dashboard/clients/actions"
import { Button } from "@/app/components/ui/Button"

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
      `Are you sure you want to delete client "${clientName}"? This action is irreversible and may affect related projects.`,
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
    <div className="mt-12 pt-8 border-t border-red-100">
      <div className="flex items-start justify-between p-6 bg-red-50/50 rounded-2xl border border-red-100">
        <div className="space-y-1">
          <h3 className="text-red-900 font-semibold">Danger Zone</h3>
          <p className="text-sm text-red-700/80">
            Deleting a client will result in the permanent loss of all
            associated data.
          </p>
        </div>

        <Button onClick={handleDelete} disabled={isDeleting} variant="danger">
          {isDeleting ? "Deleting..." : "Delete Client"}
        </Button>
      </div>
    </div>
  )
}
