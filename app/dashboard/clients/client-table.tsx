"use client"

import { useState } from "react"
import type { Client } from "@/app/types/shared"
import ClientSidebar from "./client-sidebar"

export default function ClientListTable({ clients }: { clients: Client[] }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <div className="drawer drawer-end">
      <input
        id="client-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={!!selectedClient}
        onChange={() => setSelectedClient(null)}
      />

      <div className="drawer-content overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name / Company</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover cursor-pointer transition-colors"
                onClick={() => setSelectedClient(client)}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-8 flex items-center justify-center">
                        <span className="text-xs">
                          {client.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold">{client.name}</div>
                  </div>
                </td>
                <td className="text-base-content/70">{client.email || "—"}</td>
                <td>
                  <span
                    className={`badge badge-sm ${client.status === "active" ? "badge-success" : "badge-ghost"}`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="text-right">
                  <button className="btn btn-ghost btn-xs">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ClientSidebar
        client={selectedClient}
        onCloseAction={() => setSelectedClient(null)}
      />
    </div>
  )
}
