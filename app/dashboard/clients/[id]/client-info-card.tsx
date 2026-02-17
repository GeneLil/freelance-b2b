import Link from "next/link"
import { Mail, Phone, MapPin, Building, FileText, Pencil } from "lucide-react"
import { Client } from "@/app/types/shared" // Убедись, что путь к типам верный

export default function ClientInfoCard({ client }: { client: Client }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="w-16 h-16 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-2xl font-bold mb-3">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="card-title text-2xl font-black">{client.name}</h2>
            <div
              className={`badge mt-2 font-bold uppercase tracking-wider ${
                client.status === "active"
                  ? "badge-success badge-outline"
                  : "badge-ghost"
              }`}
            >
              {client.status}
            </div>
          </div>
          <Link
            href={`/dashboard/clients/${client.id}/edit`}
            className="btn btn-square btn-ghost btn-sm"
            title="Edit Profile"
          >
            <Pencil size={16} />
          </Link>
        </div>

        <div className="divider my-0"></div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-base-content/50" />
            <span className="font-medium">{client.email}</span>
          </div>

          {client.phone && (
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-base-content/50" />
              <span>{client.phone}</span>
            </div>
          )}

          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-base-content/50 mt-1" />
            <span className="whitespace-pre-line">
              {client.address || "No address provided"}
            </span>
          </div>
        </div>

        <div className="divider">Billing Info</div>

        <div className="bg-base-200/50 p-4 rounded-xl space-y-3 text-xs">
          <div className="flex items-start gap-2">
            <Building size={14} className="mt-0.5 opacity-50" />
            <div>
              <p className="font-bold opacity-50 uppercase tracking-wider mb-0.5">
                Company / Legal Name
              </p>
              <p className="font-mono text-sm">{client.name}</p>{" "}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <FileText size={14} className="mt-0.5 opacity-50" />
            <div>
              <p className="font-bold opacity-50 uppercase tracking-wider mb-0.5">
                VAT / Tax ID
              </p>
              <p className="font-mono text-sm">{client.vat_id || "—"}</p>{" "}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold opacity-40 uppercase mb-2">
            Private Notes
          </p>
          <div className="text-sm italic opacity-60">
            {client.notes || "No notes added yet."}
          </div>
        </div>
      </div>
    </div>
  )
}
