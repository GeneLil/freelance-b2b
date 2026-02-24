"use client"

import { useState } from "react"
import { updateProjectAction } from "@/app/dashboard/projects/actions"
import { Save } from "lucide-react"
import Link from "next/link"
import type { Project, BillingType } from "@/app/types/shared"

export default function EditProjectForm({
  project,
  clients,
}: {
  project: Project
  clients: { id: string; name: string }[]
}) {
  const [billingType, setBillingType] = useState<BillingType>(
    (project.billing_type as BillingType) || "hourly",
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initialClient = clients.find((c) => c.id === project.client_id)
  const [clientSearchName, setClientSearchName] = useState(
    initialClient?.name || "",
  )
  const [selectedClientId, setSelectedClientId] = useState(
    project.client_id || "",
  )

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setClientSearchName(value)

    const matchedClient = clients.find(
      (c) => c.name.toLowerCase() === value.toLowerCase(),
    )
    setSelectedClientId(matchedClient ? matchedClient.id : "")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!selectedClientId) {
      setError("Please select a valid client from the list.")
      return
    }

    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)

    const result = await updateProjectAction({
      id: project.id,
      client_id: formData.get("client_id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      billing_type: billingType,
      rate: Number(formData.get("rate")),
      currency: formData.get("currency") as string,
      status: formData.get("status") as string,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">
          General Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full relative">
            <label className="label">
              <span className="label-text font-bold">Client</span>
            </label>

            <input
              list="clients-datalist-edit"
              value={clientSearchName}
              onChange={handleClientChange}
              placeholder="Type to search client..."
              className={`input input-bordered w-full focus:input-primary transition-all font-medium ${
                clientSearchName && !selectedClientId ? "input-error" : ""
              }`}
              required
            />
            <datalist id="clients-datalist-edit">
              {clients.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>

            <input
              type="hidden"
              name="client_id"
              value={selectedClientId}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Project Name</span>
            </label>
            <input
              name="name"
              defaultValue={project.name}
              required
              className="input input-bordered w-full focus:input-primary transition-all font-medium"
            />
          </div>

          <div className="form-control w-full md:col-span-2">
            <label className="label">
              <span className="label-text font-bold">Status</span>
            </label>
            <select
              name="status"
              defaultValue={project.status || "active"}
              className="select select-bordered w-full focus:select-primary font-medium"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full mt-2">
          <label className="label">
            <span className="label-text font-medium opacity-80">
              Description
            </span>
          </label>
          <textarea
            name="description"
            defaultValue={project.description || ""}
            className="textarea textarea-bordered h-24 w-full focus:textarea-primary transition-all"
          ></textarea>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">
            Billing & Rates
          </h3>
          <div className="h-px bg-base-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Billing Type</span>
            </label>
            <div className="flex bg-base-200 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setBillingType("hourly")}
                className={`flex-1 px-4 py-2 text-sm cursor-pointer font-medium rounded-md transition-all ${
                  billingType === "hourly"
                    ? "bg-base-100 shadow-sm"
                    : "text-base-content/60 hover:text-base-content"
                }`}
              >
                Hourly
              </button>
              <button
                type="button"
                onClick={() => setBillingType("fixed")}
                className={`flex-1 px-4 py-2 text-sm cursor-pointer font-medium rounded-md transition-all ${
                  billingType === "fixed"
                    ? "bg-base-100 shadow-sm"
                    : "text-base-content/60 hover:text-base-content"
                }`}
              >
                Fixed
              </button>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">
                {billingType === "hourly" ? "Hourly Rate" : "Total Budget"}
              </span>
            </label>
            <input
              name="rate"
              type="number"
              step="0.01"
              defaultValue={project.rate || ""}
              required
              className="input input-bordered w-full font-mono focus:input-primary"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Currency</span>
            </label>
            <select
              name="currency"
              defaultValue={project.currency || "USD"}
              className="select select-bordered w-full focus:select-primary font-medium"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="alert alert-error text-sm py-3 font-medium rounded-lg"
        >
          <span>{error}</span>
        </div>
      )}

      <div className="pt-6 mt-8 border-t border-base-200 flex flex-col md:flex-row items-center md:justify-end gap-4">
        <Link
          href="/dashboard/projects"
          className="btn btn-ghost w-full md:w-auto order-2 md:order-1 hover:bg-base-200/50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full md:w-auto order-1 md:order-2 font-bold gap-2 shadow-sm"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Save size={18} />
          )}
          Update Project
        </button>
      </div>
    </form>
  )
}
