"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
              isActive
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-black",
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 mr-3 transition-colors",
                isActive
                  ? "text-white"
                  : "text-gray-400 group-hover:text-black",
              )}
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
