"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/app/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ totalCount }: { totalCount: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const totalPages = Math.ceil(totalCount / limit)

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const updateLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("limit", newLimit)
    params.set("page", "1") // Сбрасываем на первую страницу при смене лимита
    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1 && limit === 10) return null

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Show</span>
        <select
          value={limit}
          onChange={(e) => updateLimit(e.target.value)}
          className="text-sm border border-gray-300 rounded p-1 outline-none focus:ring-1 focus:ring-black"
        >
          {[5, 10, 20, 50].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">per page</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="small"
          icon={<ChevronLeft size={16} />}
          disabled={currentPage <= 1}
          onClick={() => updatePage(currentPage - 1)}
        />
        <span className="text-sm font-medium px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="small"
          icon={<ChevronRight size={16} />}
          disabled={currentPage >= totalPages}
          onClick={() => updatePage(currentPage + 1)}
        />
      </div>
    </div>
  )
}
