import { useState } from "react"

import { useRouter } from "next/router"

import { useStoreState, useStoreActions } from "../store"

import { Table, TableProps } from "../components/table"
import { SearchInput } from "../components/SearchInput"

export default function DatabaseModelTableView() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const graphqlSchema = useStoreState(store => store.graphqlSchema)
  const setCurrentTryItOutOperationName = useStoreActions(
    store => store.setCurrentTryItOutOperationName
  )

  const tryItOutButton = (
    <span className="cursor-pointer try-it-out-button" role="button">
      Try it out <span className="pl-2 try-it-out-icon">↪</span>
    </span>
  )

  const queryType = graphqlSchema?.getQueryType()
  const queryFields = queryType?.getFields()

  const mutationType = graphqlSchema?.getMutationType()
  const mutationFields = mutationType?.getFields()

  const subscriptionType = graphqlSchema?.getSubscriptionType()
  const subscriptionFields = subscriptionType?.getFields()

  const graphqlOperationsColumns: TableProps["columns"] = []

  for (const name in queryFields) {
    const operation = queryFields[name]
    if (!operation.name.toLowerCase().includes(search.toLowerCase())) continue
    graphqlOperationsColumns.push({
      operationType: "Query",
      operationName: operation.name,
      description: operation.description,
      tryItOut: tryItOutButton,
    })
  }

  for (const name in mutationFields) {
    const operation = mutationFields[name]
    if (!operation.name.toLowerCase().includes(search.toLowerCase())) continue
    graphqlOperationsColumns.push({
      operationType: "Mutation",
      operationName: operation.name,
      description: operation.description,
      tryItOut: tryItOutButton,
    })
  }

  for (const name in subscriptionFields) {
    const operation = subscriptionFields[name]
    if (!operation.name.toLowerCase().includes(search.toLowerCase())) continue
    graphqlOperationsColumns.push({
      operationType: "Subscription",
      operationName: operation.name,
      description: operation.description,
      tryItOut: tryItOutButton,
    })
  }

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="text-3xl">GraphQL Operations</h1>
      <SearchInput
        className="bg-red-700"
        placeholder="Search for operations"
        onChange={e => setSearch(e.target.value)}
      />
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
            onClick={() => {
              if (
                cell.header.onClick &&
                typeof cell.header.onClick == "function"
              )
                cell.header.onClick(cell.column)
            }}
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
    </div>
  )
}
