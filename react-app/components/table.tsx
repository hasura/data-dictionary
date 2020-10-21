export interface TableProps {
  headers: Array<{
    key: string
    displayName: string
  }>
  columns: Record<string, any>[]
}

export function Table(props: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  {props.headers?.map(it => (
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                      {it.displayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.columns?.map(col => (
                  <tr className="even:bg-gray-100">
                    {Object.keys(col).map((_, idx) => (
                      <td className="px-2 py-4 whitespace-no-wrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {/* Have to look up the value at n'th key index of the column's keys to preserve the same order as the headers */}
                              {col[props?.headers[idx].key]}
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
