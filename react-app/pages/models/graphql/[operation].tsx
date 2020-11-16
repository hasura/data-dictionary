import React from "react"
import { useRouter } from "next/router"
import { useStoreState } from "../../../store"
import { Table } from "../../../components/table"
import { getNamedType, GraphQLSchema, isObjectType } from "graphql"

interface GetGraphQLOperationFieldsParams {
  graphqlSchema: GraphQLSchema
  operationName: string
}

/**
 * Returns the GraphQLFieldMap (fields) for an operation (query/mutation/subscription)
 * given a GraphQL schema and an operation name
 */
function getGraphQLOperationFields(params: GetGraphQLOperationFieldsParams) {
  const queryRoot = params.graphqlSchema.getQueryType()
  const mutationRoot = params.graphqlSchema.getMutationType()
  const subscriptionRoot = params.graphqlSchema.getSubscriptionType()

  const queries = queryRoot?.getFields()
  if (queries) {
    const query = queries[params.operationName]

    if (query) {
      const queryType = getNamedType(query.type)
      if (isObjectType(queryType)) return queryType.getFields()
    }
  }

  const mutations = mutationRoot?.getFields()
  if (mutations) {
    const mutation = mutations[params.operationName]

    if (mutation) {
      const mutationType = getNamedType(mutation.type)
      if (isObjectType(mutationType)) return mutationType.getFields()
    }
  }

  const subscriptions = subscriptionRoot?.getFields()
  if (subscriptions) {
    const subscription = subscriptions[params.operationName]

    if (subscription) {
      const subscriptionType = getNamedType(subscription.type)
      if (isObjectType(subscriptionType)) return subscriptionType.getFields()
    }
  }

  return null
}

export default function GraphQLOperationView() {
  const router = useRouter()
  const operationName = router.query.operation as string
  const graphqlSchema = useStoreState(store => store.graphqlSchema)
  const fields = getGraphQLOperationFields({
    graphqlSchema: graphqlSchema!,
    operationName,
  })

  if (!fields) return <p>No fields</p>

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-semibold text-gray-800 capitalize">
        {operationName}
      </h1>
      <hr className="mb-4 border border-gray-300" />
      <h1 className="py-6 text-xl font-semibold text-gray-800">Fields</h1>
      <Table
        headers={[
          {
            key: "name",
            displayName: "Field Name",
          },
          {
            key: "description",
            displayName: "Description",
          },
          {
            key: "type",
            displayName: "Type",
          },
        ]}
        columns={Object.values(fields).map(node => ({
          name: node.name,
          description: node.description,
          type: node.type.toString(),
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
          return (
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
        }}
      />
    </div>
  )
}
