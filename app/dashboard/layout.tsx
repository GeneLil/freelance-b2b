import Link from "next/link"
import { LogoutButton } from "@/app/login/components/logout-button"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Clients", href: "/dashboard/clients", icon: "Users" },
  { name: "Projects", href: "/dashboard/projects", icon: "Briefcase" },
  { name: "Invoices", href: "/dashboard/invoices", icon: "FileText" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold tracking-tight">FreelanceOS</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-black transition-colors group"
            >
              <span className="w-5 h-5 mr-3 bg-gray-200 rounded-sm group-hover:bg-gray-300 transition-colors" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              ME
            </div>
            <div className="text-xs">
              <p className="font-medium text-gray-700">My Account</p>
              <p className="text-gray-400">Pro Plan</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</div>
      </main>
    </div>
  )
}
