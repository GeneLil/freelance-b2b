import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <p className="text-gray-600">Welcome back,</p>
        <p className="font-semibold text-lg">{user.email}</p>
      </div>
    </div>
  )
}
