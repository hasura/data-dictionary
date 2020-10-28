interface TableHeader {
  key: string
  displayName: string
}

export interface TableProps {
  headers: TableHeader[]
  columns: Record<string, any>[]

  Header: (header: TableHeader) => JSX.Element
  Cell: (value: unknown) => JSX.Element
}

export function Table(props: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>{props.headers?.map(props.Header)}</tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.columns?.map(col => (
                  <tr className="even:bg-gray-100">
                    {Object.keys(col).map((_, idx) =>
                      props.Cell(col[props?.headers[idx].key])
                    )}
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
