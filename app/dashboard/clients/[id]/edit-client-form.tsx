"use client"

import { type FormEvent, useState } from "react"
import { updateClientAction } from "@/app/dashboard/clients/actions"
import type { Tables } from "@/app/types/supabase"
import type { Currency } from "@/app/types/shared"
import type { Status } from "@/app/dashboard/clients/types"

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
    const currency = formData.get("currency") as Currency
    const status = formData.get("status") as Status

    const result = await updateClientAction({
      id: client.id,
      email,
      name,
      status,
      currency,
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
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Default Currency
        </label>
        <select
          name="currency"
          id="currency"
          defaultValue={client.currency || "USD"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
        </select>
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
      <div className="pt-4">
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Client"}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}
