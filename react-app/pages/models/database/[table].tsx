import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useStoreState, useStoreActions } from "../../../store"
import { Table, TableProps } from "../../../components/table"
import { RelatedVisualizer } from "../../../components/related-types"
import { mapDatabaseColumnTypeToGraphQLType } from "../../../store/utils"
import Link from "next/link"

export default function DatabaseModelTableView() {
  const router = useRouter()

  const graphqlSchema = useStoreState(store => store.graphqlSchema)
  const setCurrentTryItOutOperationName = useStoreActions(
    store => store.setCurrentTryItOutOperationName
  )

  const metadata = useStoreState(store => store.metadata)
  const groupedMetadata = useStoreState(
    store => store.groupedMetadataAndDatabaseTables
  )

  const graphData = useStoreState(store => store.graphedData)
  const graphMap = useStoreState(store => store.graphedMap)

  const [data, setData] = useState()
  const [showDegrees, setShowDegrees] = useState(2)

  const tableName = router.query.table as string
  const currentItem = groupedMetadata?.[tableName]

  const tryItOutButton = (
    <span className="cursor-pointer try-it-out-button" role="button">
      Try it out <span className="pl-2 try-it-out-icon">↪</span>
    </span>
  )

  const queryType = graphqlSchema?.getQueryType()
  const queryFields = queryType?.getFields()

  const mutationType = graphqlSchema?.getMutationType()
  const mutationFields = mutationType?.getFields()

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
      tryItOut: tryItOutButton,
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
      tryItOut: tryItOutButton,
    })
  }

  function filterData() {
    const { first, second } = graphMap?.[tableName]
    let neighbors =
      showDegrees === 1
        ? first.concat([tableName])
        : first.concat(second, [tableName])

    const filteredNodes = graphData?.nodes.filter(node =>
      neighbors.includes(node?.id)
    )
    const filteredLinks = graphData?.links.filter(
      link =>
        neighbors.includes(link?.source?.id) &&
        neighbors.includes(link?.target?.id)
    )

    setData({ nodes: filteredNodes, links: filteredLinks })
  }

  useEffect(() => {
    if (tableName && graphData && graphMap) {
      filterData()
    }
  }, [tableName, graphMap, graphData, showDegrees])

  if (!currentItem || !data) {
    return null
  }

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-semibold text-gray-800 capitalize">
        {tableName}
      </h1>
      <hr className="mb-4 border border-gray-300" />
      <h1 className="py-6 text-xl font-semibold text-gray-800">Fields</h1>
      <Table
        headers={[
          {
            key: "column_name",
            displayName: "Field Name",
          },
          {
            key: "comment",
            displayName: "Description",
          },
          {
            key: "udt_name",
            displayName: "Type",
          },
          {
            key: "graphql_type",
            displayName: "GraphQL Type",
          },
          {
            key: "index",
            displayName: "Index",
          },
        ]}
        columns={currentItem.database_table.columns?.map(it => ({
          column_name: it.column_name,
          comment: it.comment,
          udt_name: it.udt_name,
          graphql_type: mapDatabaseColumnTypeToGraphQLType({
            metadata,
            columnName: it.column_name,
            tableName: it.table_name,
            graphqlSchema: graphqlSchema!,
          }),
          index: (() => {
            const idx = currentItem.database_table.indexes.find(idx =>
              (idx as any).index_keys.includes(it.column_name)
            )
            if (idx) return `${idx.index_type} (${idx.index_name})`
            else return "NULL"
          })(),
        }))}
        Header={header => (
          <th
            key={header.displayName}
            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50"
          >
            {header.displayName}
          </th>
        )}
        Cell={(cell, index) => {
          const content = (
            <td
              key={cell.header.key + index}
              className="px-2 py-4 whitespace-no-wrap"
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {cell.column[cell.header.key]}
                  </div>
                </div>
              </div>
            </td>
          )
          if (cell.header.key == "graphql_type")
            return (
              <Link
                href={`https://spec.graphql.org/June2018/#sec-${
                  cell.column[cell.header.key]
                }`}
              >
                {content}
              </Link>
            )
          else return content
        }}
      />
      <h1 className="py-6 mt-6 mb-2 text-xl font-semibold text-gray-800">
        Root Fields
      </h1>
      <Table
        headers={[
          {
            key: "operationType",
            displayName: "Type",
          },
          {
            key: "operationName",
            displayName: "Operation Name",
            onClick: column => {
              router.push("/models/graphql/" + column.operationName)
            },
          },
          {
            key: "description",
            displayName: "description",
          },
          {
            key: "tryItOut",
            displayName: "",
            onClick: column => {
              console.log(
                "Try it out onClick fired, attempting to route to GraphiQL"
              )
              setCurrentTryItOutOperationName(column.operationName)
              router.push("/graphiql")
            },
          },
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
      <h1 className="py-6 mt-6 mb-2 text-xl font-semibold text-gray-800">
        Related Types
      </h1>

      {data?.links?.length ? (
        <>
          <div className="pb-">
            <button
              className={`btn mx-2 ${
                showDegrees === 1 ? "text-gray-900 underline" : "text-gray-600"
              }`}
              onClick={() => setShowDegrees(1)}
            >
              1st degree
            </button>
            <button
              className={`btn mx-2 ${
                showDegrees === 2 ? "text-gray-900 underline" : "text-gray-600"
              }`}
              onClick={() => setShowDegrees(2)}
            >
              2nd degree
            </button>
          </div>
          <RelatedVisualizer width={800} height={300} {...data} />
        </>
      ) : (
        <p className="mt-2 text-gray-600">No relationships found</p>
      )}
    </div>
  )
}
