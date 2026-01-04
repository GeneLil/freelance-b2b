"use client"

import Link from "next/link"
import { createClientAction } from "@/app/dashboard/clients/actions"
import { useState, type FormEvent } from "react"
import type { Currency } from "@/app/types/shared"
import type { Status } from "@/app/dashboard/clients/types"

export default function NewClientPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const currency = formData.get("currency") as Currency
    const status = "active" as Status

    const result = await createClientAction({
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/clients"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          &larr; Back to Clients
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Client</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Client Name / Company *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="e.g. Acme Corp or John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
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
              defaultValue="USD"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              disabled={loading}
              type="submit"
              className="cursor-pointer flex-1 bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition shadow-sm"
            >
              Create Client
            </button>
            <Link
              href="/dashboard/clients"
              className="flex-1 bg-gray-100 text-center text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  )
}
