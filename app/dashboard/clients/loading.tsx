export default function ClientsLoading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 w-32 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 w-48 bg-gray-100 rounded-md"></div>
        </div>
        <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="h-12 bg-gray-50 border-b border-gray-200"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-6 border-b border-gray-100"
          >
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
