import { useRouter } from "next/router"
import { useStoreState } from "../../../store"
import { Table } from "../../../components/table"
import { SchemaVisualizer } from "../../../components/visualization"

export default function DatabaseModelTableView() {
  const router = useRouter()
  const metadata = useStoreState(
    store => store.groupedMetadataAndDatabaseTables
  )
  const currentItem = metadata[router.query.table as string]

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-gray-800 capitalize">
        {router.query.table}
      </h1>
      <hr className="mb-4 border border-gray-400" />
      <h1 className="mb-2 text-xl font-bold text-gray-800">Fields</h1>
      <Table
        headers={[
          {
            key: "column_name",
            displayName: "Field Name"
          },
          {
            key: "comment",
            displayName: "Description"
          },
          {
            key: "udt_name",
            displayName: "Type"
          },
          {
            key: "index",
            displayName: "Index"
          }
        ]}
        columns={currentItem.database_table.columns?.map(it => ({
          column_name: it.column_name,
          comment: it.comment,
          udt_name: it.udt_name,
          index: (() => {
            const idx = currentItem.database_table.indexes.find(idx =>
              (idx as any).index_keys.includes(it.column_name)
            )
            if (idx) return `${idx.index_type} (${idx.index_name})`
            else return "NULL"
          })()
        }))}
        Header={header => (
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
            {header.displayName}
          </th>
        )}
        Cell={value => (
          <td className="px-2 py-4 whitespace-no-wrap">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {value}
                </div>
              </div>
            </div>
          </td>
        )}
      />
      <h1 className="mt-6 mb-2 text-xl font-bold text-gray-800">
        Related Types
      </h1>
      <SchemaVisualizer />
    </div>
  )
}
