import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/app/components/ui/Button"
import { AlertCircle, CheckCircle2, Square } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      {/* 1. Приветствие и Краткая Сводка */}
      <header>
        <h1 className="text-2xl font-bold">Welcome back, Alexey</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <StatCard title="Week Earnings" value="$1,200" change="+12%" />
          <StatCard title="Pending" value="$3,450" highlight />
          <StatCard title="Active Projects" value="4" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Основная рабочая зона (2/3 ширины) */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Current Focus</h2>

            {/* Пример почасового трекера (Active) */}
            <div className="bg-gray-50 rounded-xl p-4 border border-blue-100 flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-600 uppercase">
                  Hourly Tracking
                </p>
                <input
                  className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 placeholder:text-gray-400"
                  placeholder="What are you working on?"
                />
              </div>
              <div className="text-xl font-mono font-bold">02:14:35</div>
              <Button
                size="small"
                variant="danger"
                shape="circle"
                icon={<Square size={16} fill="currentColor" />}
              />
            </div>

            {/* Список майлстоунов (Fixed Price) */}
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      shape="circle"
                      size="small"
                      icon={
                        <CheckCircle2 size={16} className="text-gray-300" />
                      }
                    />
                    <div>
                      <p className="text-sm font-medium">Landing Page UI Kit</p>
                      <p className="text-xs text-gray-500">
                        Project: Solar Mobile App • Due in 2 days
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$800</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 3. Зона внимания (1/3 ширины) */}
        <div className="space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              Attention
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  Unpaid Invoice #102
                </p>
                <p className="text-xs text-red-600">
                  Client: Nike • 5 days overdue
                </p>
                <button className="mt-2 text-xs font-bold text-red-800 underline">
                  Send Reminder
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  highlight = false,
}: {
  title: string
  value: string
  change?: string
  highlight?: boolean
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <h3
          className={`text-2xl font-bold ${highlight ? "text-blue-600" : "text-gray-900"}`}
        >
          {value}
        </h3>
        {change && (
          <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
            {change}
          </span>
        )}
      </div>
    </div>
  )
}
