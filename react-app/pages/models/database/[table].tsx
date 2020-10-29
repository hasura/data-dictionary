import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useStoreState, useStoreActions } from "../../../store"
import { Table, TableProps } from "../../../components/table"
import { SchemaVisualizer } from "../../../components/visualization"

export default function DatabaseModelTableView() {
  const router = useRouter()

  const setcurrentTryItOutOperationName = useStoreActions(
    store => store.setcurrentTryItOutOperationName
  )
  const metadata = useStoreState(
    store => store.groupedMetadataAndDatabaseTables
  )
  const [data, setData] = useState()

  const graphqlSchema = useStoreState(store => store.graphqlSchema)

  const tableName = router.query.table as string
  const currentItem = metadata[tableName]

  const graphqlFieldsHeaders: TableProps["headers"] = [
    {
      key: "operationType",
      displayName: "Type"
    },
    {
      key: "operationName",
      displayName: "Operation Name"
    },
    {
      key: "description",
      displayName: "description"
    }
  ]

  const queryType = graphqlSchema.getQueryType()
  const queryFields = queryType.getFields()

  const mutationType = graphqlSchema.getMutationType()
  const mutationFields = mutationType.getFields()

  const graphqlOperationsColumns: TableProps["columns"] = []

  // TODO: Refactor this to check the return type of the query, instead of the name against the current table
  // This is because a query, like "insert_album", could be renamed to "hippopotamus" and the only way to connect it is by the return type
  // Current implemenation is quick + dirty and (mostly) works, so it's a hold-over until then
  for (const name in queryFields) {
    const operation = queryFields[name]
    if (!operation.name.toLowerCase().includes(tableName.toLowerCase()))
      continue
    graphqlOperationsColumns.push({
      operationType: "Query",
      operationName: operation.name,
      description: operation.description,
      tryItOut: "Try it out ↪"
    })
  }

  for (const name in mutationFields) {
    const operation = mutationFields[name]
    if (!operation.name.toLowerCase().includes(tableName.toLowerCase()))
      continue
    graphqlOperationsColumns.push({
      operationType: "Mutation",
      operationName: operation.name,
      description: operation.description,
      tryItOut: "Try it out ↪"
    })
  }

  useEffect(() => {
    if (currentItem) {
      const firstDegreeArrays =
        currentItem.array_relationships?.map(
          x => x.using.foreign_key_constraint_on.table.name
        ) || []

      const firstDegreeObjects =
        currentItem.database_table.foreign_keys.map(x => x.ref_table) || []

      const firstDegrees = firstDegreeArrays
        .concat(firstDegreeObjects)
        .concat([currentItem.table.name])

      const nodes = Object.entries(metadata)
        .filter(m => firstDegrees.includes(m[0]))
        .map(item => ({ ...item[1], id: item[0] }))

      const links = nodes
        .map(val => {
          const arrays =
            val.array_relationships?.map(rel => ({
              ...rel,
              target: val.id,
              source: rel.using.foreign_key_constraint_on.table.name
            })) || []

          const objects =
            val.object_relationships?.map(rel => {
              const target = nodes.find(x => x.id === val.id)
              const sourcekey =
                rel?.using?.foreign_key_constraint_on ||
                rel?.using?.manual_configuration?.remote_table?.name
              const sourcenode = val.database_table.foreign_keys?.find(
                fk => fk.column_mapping[sourcekey]
              )
              const source = nodes.find(x => x.id === sourcenode.ref_table)
              return {
                ...rel,
                target,
                source
              }
            }) || []

          const all_relationships = arrays
            .concat(objects)
            .filter(x => x.target && x.source)

          return all_relationships
        })
        .filter(l => l.length > 0)
        .flat()

      setTimeout(() => setData({ nodes, links }), 500)
    }
  }, [currentItem])

  if (!currentItem) {
    return null
  }

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-gray-800 capitalize">
        {tableName}
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
        Cell={cell => (
          <td className="px-2 py-4 whitespace-no-wrap">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {cell.column[cell.header.key]}
                </div>
              </div>
            </div>
          </td>
        )}
      />
      <h1 className="mt-6 mb-2 text-xl font-bold text-gray-800">Root Fields</h1>
      <Table
        headers={[
          {
            key: "operationType",
            displayName: "Type"
          },
          {
            key: "operationName",
            displayName: "Operation Name"
          },
          {
            key: "description",
            displayName: "description"
          },
          {
            key: "tryItOut",
            displayName: "",
            onClick: column => {
              console.log(
                "Try it out onClick fired, attempting to route to GraphiQL"
              )
              setcurrentTryItOutOperationName(column.operationName)
              router.push("/graphiql")
            }
          }
        ]}
        columns={graphqlOperationsColumns}
        Header={header => (
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
            {header.displayName}
          </th>
        )}
        Cell={cell => (
          <td
            className="px-2 py-4 whitespace-no-wrap"
            onClick={() => cell.header.onClick(cell.column)}
          >
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {cell.column[cell.header.key]}
                </div>
              </div>
            </div>
          </td>
        )}
      />
      <h1 className="mt-6 mb-2 text-xl font-bold text-gray-800">
        Related Types
      </h1>
      {data ? (
        <SchemaVisualizer width={650} height={300} {...data} />
      ) : (
        <p>No relationships found</p>
      )}
    </div>
  )
}
