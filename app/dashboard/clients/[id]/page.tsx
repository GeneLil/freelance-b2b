import { notFound } from "next/navigation"
import { getClientFullProfile } from "./queries" // Твоя новая функция
import ClientInfoCard from "./client-info-card"
import ClientWorkArea from "./client-work-area"

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await getClientFullProfile(id)

  if (!data || !data.client) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 sticky top-6">
          <ClientInfoCard client={data.client} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <ClientWorkArea
            projects={data.projects}
            invoices={data.invoices}
            history={data.history}
            financials={data.financials}
            client={data.client}
          />
        </div>
      </div>
    </div>
  )
}
