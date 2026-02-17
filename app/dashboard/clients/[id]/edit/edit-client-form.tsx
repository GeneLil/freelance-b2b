"use client"

import { type FormEvent, useState } from "react"
import { updateClientAction } from "@/app/dashboard/clients/actions"
import type { Client, ClientStatus } from "@/app/types/shared"
import { Save } from "lucide-react"
import Link from "next/link"

export default function EditClientForm({ client }: { client: Client }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const payload = {
      id: client.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      vat_id: formData.get("vat_id") as string,
      notes: formData.get("notes") as string,
      status: formData.get("status") as ClientStatus,
    }

    const result = await updateClientAction(payload)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input type="hidden" name="id" value={client.id} />

      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">
          Essential Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Client Name</span>
            </label>
            <input
              name="name"
              defaultValue={client.name}
              required
              className="input input-bordered w-full focus:input-primary transition-all font-medium"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={client.email}
              required
              className="input input-bordered w-full focus:input-primary transition-all font-medium"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Status</span>
            </label>
            <select
              name="status"
              defaultValue={client.status || "active"}
              className="select select-bordered w-full focus:select-primary"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">
            Optional Details
          </h3>
          <div className="h-px bg-base-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium opacity-80">
                Phone Number
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              defaultValue={client.phone || ""}
              placeholder="+1 (555) 000-0000"
              className="input input-bordered w-full focus:input-primary transition-all"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium opacity-80">
                VAT / Tax ID
              </span>
            </label>
            <input
              type="text"
              name="vat_id"
              defaultValue={client.vat_id || ""}
              placeholder="e.g. US-123456789"
              className="input input-bordered w-full focus:input-primary transition-all"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium opacity-80">
              Billing Address
            </span>
          </label>
          <textarea
            name="address"
            defaultValue={client.address || ""}
            className="textarea textarea-bordered h-24 w-full leading-relaxed focus:textarea-primary transition-all"
            placeholder="Street Address&#10;City, State, Zip&#10;Country"
          ></textarea>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium opacity-80">
              Private Notes
            </span>
          </label>
          <textarea
            name="notes"
            defaultValue={client.notes || ""}
            className="textarea textarea-bordered h-24 w-full focus:textarea-primary transition-all"
            placeholder="Internal notes..."
          ></textarea>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="alert alert-error text-sm py-3 font-medium rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="pt-6 mt-8 border-t border-base-200 flex flex-col md:flex-row items-center md:justify-end gap-4">
        <Link
          href="/dashboard/clients"
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
          Update Client
        </button>
      </div>
    </form>
  )
}
