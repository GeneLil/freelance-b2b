"use client"

import { type FormEvent, useState } from "react"
import { updateClientAction } from "@/app/dashboard/clients/actions"
import type { Tables } from "@/app/types/supabase"
import type { Status } from "@/app/dashboard/clients/types"
import { Button } from "@/app/components/ui/Button"
import Link from "next/link"

export default function EditClientForm({
  client,
}: {
  client: Tables<"clients">
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const status = formData.get("status") as Status

    const result = await updateClientAction({
      id: client.id,
      email,
      name,
      status,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={client.id} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          defaultValue={client.name}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          defaultValue={client.email}
          placeholder="client@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          defaultValue={client.status || "active"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div className="pt-4 flex gap-3">
        <Button disabled={loading} type="submit" className="w-1/2">
          {loading ? "Saving..." : "Update Client"}
        </Button>
        <Link
          href="/dashboard/clients"
          className="flex-1 bg-gray-100 text-center w-1/2 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </Link>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}
