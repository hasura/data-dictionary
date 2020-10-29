import GraphiQL from "graphiql"
import "graphiql/graphiql.css"

import {
  GraphQLObjectType,
  isObjectType,
  getNamedType,
  assertObjectType
} from "graphql"
import { useStoreState } from "../store"

// TODO: Change this to be dynamic or take UI input
const HASURA_ENDPOINT = "http://localhost:8085/v1/graphql"

function graphQLFetcher(graphQLParams) {
  return fetch(HASURA_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json())
}

export const GraphiQLRenderer = () => {
  const currentTryItOutOperationName = useStoreState(
    state => state.currentTryItOutOperationName
  )
  const schema = useStoreState(state => state.graphqlSchema)

  const queryType = schema.getQueryType()
  const queryOperations = queryType.getFields()

  const currentOperation = queryOperations[currentTryItOutOperationName]

  const operationType = assertObjectType(getNamedType(currentOperation.type))
  const operationFields = operationType.getFields()

  return (
    <GraphiQL
      fetcher={graphQLFetcher}
      query={`
      query {
        ${currentTryItOutOperationName} {
         ${Object.entries(operationFields)
           .map(([fieldName, node]) => {
             console.log({ fieldName, node })
             return fieldName
           })
           .join("\n         ")}
        }
      }
    `}
    />
  )
}
