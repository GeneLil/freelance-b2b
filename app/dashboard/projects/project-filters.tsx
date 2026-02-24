"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import { useTransition } from "react"

export default function ProjectFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentStatus = searchParams.get("status") || "all"
  const currentType = searchParams.get("type") || "all"
  const currentSearch = searchParams.get("search") || ""

  const updateParams = (updates: Record<string, string>) => {
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
      router.push(`/dashboard/projects?${params.toString()}`)
    })
  }

  const handleSearch = useDebouncedCallback((term) => {
    updateParams({ search: term })
  }, 300)

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          className="absolute left-3 top-1/2 z-10 pointer-events-none -translate-y-1/2 text-base-content/40"
          size={16}
        />
        <input
          type="text"
          placeholder="Search projects or clients..."
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
        {["all", "active", "archived"].map((s) => (
          <button
            key={s}
            onClick={() => updateParams({ status: s })}
            className={`px-4 py-1.5 text-xs cursor-pointer font-bold uppercase tracking-wider rounded-md transition-all ${
              currentStatus === s
                ? "bg-base-100 text-base-content shadow-sm"
                : "text-base-content/50 hover:text-base-content"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <select
        onChange={(e) => updateParams({ type: e.target.value })}
        value={currentType}
        className="select select-bordered select-sm h-10 min-h-[40px] font-medium bg-base-100 focus:outline-none"
      >
        <option value="all">All Billing Types</option>
        <option value="hourly">Hourly Rate</option>
        <option value="fixed">Fixed Price</option>
      </select>
    </div>
  )
}
