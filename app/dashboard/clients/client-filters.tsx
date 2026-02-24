"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

export default function ClientFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentStatus = searchParams.get("status") || "all"
  const currentSearch = searchParams.get("search") || ""

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    params.set("page", "1")

    startTransition(() => {
      router.push(`/dashboard/clients?${params.toString()}`)
    })
  }

  const handleSearch = useDebouncedCallback((term) => {
    updateFilters({ search: term })
  }, 300)

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 z-10 pointer-events-none"
          size={16}
        />

        <input
          type="text"
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-bordered w-full pl-10 h-10 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
        />

        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="loading loading-spinner loading-xs opacity-50"></span>
          </div>
        )}
      </div>

      <div className="flex bg-base-200/50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => updateFilters({ status: tab.id })}
            className={`px-4 py-1.5 text-xs cursor-pointer font-bold uppercase tracking-wider rounded-md transition-all ${
              currentStatus === tab.id
                ? "bg-base-100 text-base-content shadow-sm"
                : "text-base-content/50 hover:text-base-content"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
