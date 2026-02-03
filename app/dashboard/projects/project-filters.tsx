"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

export default function ProjectFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all" || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.set("page", "1")
    router.push(`/dashboard/projects?${params.toString()}`)
  }

  const handleSearch = useDebouncedCallback((term) => {
    updateParams("search", term)
  }, 300)

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects or clients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Фильтры-табы */}
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          {["all", "active", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => updateParams("status", s)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                (searchParams.get("status") || "all") === s
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <select
          onChange={(e) => updateParams("type", e.target.value)}
          value={searchParams.get("type") || "all"}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
        >
          <option value="all">All Types</option>
          <option value="hourly">Hourly Rate</option>
          <option value="fixed">Fixed Price</option>
        </select>
      </div>
    </div>
  )
}
