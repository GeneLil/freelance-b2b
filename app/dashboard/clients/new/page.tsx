"use client"

import Link from "next/link"
import { createClientAction } from "@/app/dashboard/clients/actions"
import { useState, type FormEvent } from "react"
import { ChevronLeft, Save } from "lucide-react"

export default function NewClientPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      vat_id: formData.get("vat_id") as string,
      notes: formData.get("notes") as string,
      status: "active" as const,
    }

    const result = await createClientAction(payload)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link
          href="/dashboard/clients"
          className="btn btn-ghost btn-sm gap-2 pl-0 text-base-content/70 hover:bg-transparent hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} /> Back to Clients
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <h1 className="text-2xl font-black tracking-tight">
              Add New Client
            </h1>
            <span className="badge badge-ghost text-xs font-medium opacity-70">
              * Required fields
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Секция: Основная информация */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">
                Essential Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Client Name / Company{" "}
                      <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Acme Corp"
                    className="input input-bordered w-full focus:input-primary transition-all font-medium"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Email Address <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="client@example.com"
                    className="input input-bordered w-full focus:input-primary transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Секция: Дополнительные детали */}
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
                    placeholder="e.g. US-123456789"
                    className="input input-bordered w-full focus:input-primary transition-all"
                  />
                </div>
              </div>

              {/* Адрес - теперь точно на всю ширину */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium opacity-80">
                    Billing Address
                  </span>
                </label>
                <textarea
                  name="address"
                  className="textarea textarea-bordered h-24 w-full leading-relaxed focus:textarea-primary transition-all"
                  placeholder="Street Address&#10;City, State, Zip&#10;Country"
                ></textarea>
              </div>

              {/* Заметки - на всю ширину */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium opacity-80">
                    Private Notes
                  </span>
                </label>
                <textarea
                  name="notes"
                  className="textarea textarea-bordered h-24 w-full focus:textarea-primary transition-all"
                  placeholder="Internal notes about the client (budget, preferences, etc.)"
                ></textarea>
                <label className="label">
                  <span className="label-text-alt opacity-50">
                    Only visible to you.
                  </span>
                </label>
              </div>
            </div>

            {/* Ошибки */}
            {error && (
              <div
                role="alert"
                className="alert alert-error text-sm py-3 font-medium rounded-lg animate-pulse shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-5 w-5"
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

            {/* Футер с кнопками - Профессиональное выравнивание */}
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
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
