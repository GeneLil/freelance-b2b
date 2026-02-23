import { SidebarNav } from "./components/sidebar-nav"
import { LogoutButton } from "@/app/login/components/logout-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Freelance<span className="text-gray-500">OS</span>
          </span>
        </div>

        <SidebarNav />

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-sm">
                ME
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-xs truncate">
              <p className="font-semibold text-gray-900 truncate">
                Alexey Designer
              </p>
              <p className="text-gray-500 font-medium">Pro Plan</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-end px-8 md:hidden"></header>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </main>
    </div>
  )
}
