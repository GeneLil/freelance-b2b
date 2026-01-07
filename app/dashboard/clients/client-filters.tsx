"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function ClientFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get("status") || "all"

  const setFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === "all") {
      params.delete("status")
    } else {
      params.set("status", status)
    }
    router.push(`/dashboard/clients?${params.toString()}`)
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ]

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
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
  )
}
