"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export default function ClientFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentStatus = searchParams.get("status") || "all"
  const currentSearch = searchParams.get("search") || ""
  const currentCurrency = searchParams.get("currency") || "all"

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    startTransition(() => {
      router.push(`/dashboard/clients?${params.toString()}`)
    })
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative flex-1 min-w-50">
        <input
          type="text"
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition"
        />
        {isPending && (
          <div className="absolute right-3 top-2.5">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <select
        value={currentCurrency}
        onChange={(e) => updateFilters({ currency: e.target.value })}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-black"
      >
        <option value="all">All Currencies</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
      </select>

      <div className="flex bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => updateFilters({ status: tab.id })}
            className={`px-4 py-1.5 cursor-pointer text-sm font-medium rounded-md transition-all ${
              currentStatus === tab.id
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
