export default function EditClientLoading() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0 animate-pulse">
      <div className="mb-6 h-8 w-32 bg-base-300 rounded-lg opacity-50"></div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 space-y-8">
          <div className="h-8 w-1/2 bg-base-300 rounded-lg"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-base-200 rounded"></div>
              <div className="h-12 w-full bg-base-200 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-base-200 rounded"></div>
              <div className="h-12 w-full bg-base-200 rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-base-200 rounded"></div>
              <div className="h-12 w-full bg-base-200 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-base-200 rounded"></div>
              <div className="h-12 w-full bg-base-200 rounded-lg"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-32 bg-base-200 rounded"></div>
            <div className="h-24 w-full bg-base-200 rounded-lg"></div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-base-200">
            <div className="h-12 w-24 bg-base-200 rounded-lg"></div>
            <div className="h-12 w-32 bg-base-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
