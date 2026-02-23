import { getPaginatedClients } from "./queries"
import Link from "next/link"
import Pagination from "./pagination"
import ClientFilters from "./client-filters"
import ClientListTable from "./client-table"

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string
    search?: string
    page?: string
    sort?: string // Добавили
    order?: string // Добавили
    limit?: string
  }>
}) {
  const resolvedParams = await searchParams
  const page = Number(resolvedParams.page) || 1
  const sort = resolvedParams.sort || "created_at"
  const order = resolvedParams.order || "desc"
  const limit = Number(resolvedParams.limit) || 10

  const { clients, totalCount } = await getPaginatedClients({
    status: resolvedParams.status || "all",
    search: resolvedParams.search,
    sort,
    order,
    page,
    limit,
  })

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            Clients
          </h1>
          <p className="text-sm text-base-content/60">
            Manage your professional network
          </p>
        </div>
        <Link href="/dashboard/clients/new" className="btn btn-neutral">
          + Add Client
        </Link>
      </div>

      <div className="mb-6">
        <ClientFilters />
      </div>

      <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-220px)] min-h-[400px]">
        <div className="flex-1 overflow-auto relative">
          {clients.length === 0 ? (
            <div className="p-12 text-center h-full flex items-center justify-center">
              <h3 className="text-lg font-medium opacity-50">
                No clients found
              </h3>
            </div>
          ) : (
            <ClientListTable clients={clients} />
          )}
        </div>

        <div className="border-t border-base-200 bg-base-50 shrink-0 z-20">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
