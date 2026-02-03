"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/Button"
import { createProjectAction } from "../actions"
import { ChevronLeft, Clock } from "lucide-react"
import Link from "next/link"

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
}
export default function NewProjectForm({
  clients,
}: {
  clients: { id: string; name: string }[]
}) {
  const [billingType, setBillingType] = useState<"hourly" | "fixed">("hourly")
  const [billingCurrency, setBillingCurrency] = useState("USD")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    const result = await createProjectAction({
      client_id: formData.get("client_id") as string,
      name: formData.get("name") as string,
      billing_type: billingType,
      hourly_rate: Number(formData.get("hourly_rate")),
      fixed_price: Number(formData.get("fixed_price")),
      currency: formData.get("currency") as string,
      payment_terms: Number(formData.get("payment_terms")),
      status: "active",
    })

    if (result?.error) {
      alert(result.error)
      setLoading(false)
    }
  }

  const currencySymbol = currencySymbols[billingCurrency]

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard/projects"
        className="flex items-center text-sm text-gray-500 hover:text-black mb-6"
      >
        <ChevronLeft size={16} /> Back to Projects
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <h1 className="text-xl font-bold">Create New Project</h1>
          <p className="text-sm text-gray-500">
            Define how you will bill your client
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client
            </label>
            <select
              name="client_id"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a client...</option>
              {clients?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Website Redesign"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Billing Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBillingType("hourly")}
                className={`flex cursor-pointer items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${billingType === "hourly" ? "border-black bg-black text-white" : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"}`}
              >
                <Clock size={18} /> Hourly
              </button>
              <button
                type="button"
                onClick={() => setBillingType("fixed")}
                className={`flex cursor-pointer items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${billingType === "fixed" ? "border-black bg-black text-white" : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"}`}
              >
                {currencySymbol} Fixed Price
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {billingType === "hourly" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">
                    {currencySymbol}
                  </span>
                  <input
                    name="hourly_rate"
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
                    placeholder="0"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Fixed Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">
                    {currencySymbol}
                  </span>
                  <input
                    name="fixed_price"
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black"
                onChange={(event) => setBillingCurrency(event.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
