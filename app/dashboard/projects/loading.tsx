export default function ProjectsLoading() {
  return (
    <div className="max-w-6xl mx-auto p-4 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 w-32 bg-base-300 rounded-lg mb-2 opacity-60"></div>
          <div className="h-4 w-48 bg-base-200 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-base-300 rounded-lg opacity-50"></div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="h-10 flex-1 min-w-[200px] bg-base-200 rounded-lg opacity-60"></div>
        <div className="h-10 w-[200px] bg-base-200 rounded-lg opacity-60"></div>
        <div className="h-10 w-36 bg-base-200 rounded-lg opacity-60"></div>
      </div>

      <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="flex-1 overflow-auto">
          <table className="table w-full">
            {/* Шапка таблицы */}
            <thead className="bg-base-200/50">
              <tr>
                <th className="pl-6 pb-4 pt-4">
                  <div className="h-3 w-20 bg-base-300 rounded opacity-50"></div>
                </th>
                <th>
                  <div className="h-3 w-16 bg-base-300 rounded opacity-50"></div>
                </th>
                <th>
                  <div className="h-3 w-16 bg-base-300 rounded opacity-50"></div>
                </th>
                <th>
                  <div className="h-3 w-20 bg-base-300 rounded opacity-50"></div>
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="pl-6 py-4">
                    <div className="h-4 w-40 bg-base-300 rounded mb-2 opacity-60"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-base-300 rounded-full"></div>
                      <div className="h-3 w-24 bg-base-200 rounded"></div>
                    </div>
                  </td>
                  <td>
                    <div className="h-5 w-16 bg-base-200 rounded-full"></div>
                  </td>
                  <td>
                    <div className="h-4 w-20 bg-base-300 rounded mb-1 opacity-70"></div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-base-200 rounded-full"></div>
                      <div className="h-3 w-24 bg-base-200 rounded"></div>
                    </div>
                  </td>
                  <td className="pr-6 text-right">
                    <div className="h-5 w-5 bg-base-200 rounded ml-auto opacity-50"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-base-200 bg-base-50 p-4 shrink-0 flex justify-between items-center">
          <div className="h-8 w-32 bg-base-200 rounded-md"></div>
          <div className="h-8 w-48 bg-base-200 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}
