import GraphiQL from "graphiql"
import "graphiql/graphiql.css"

import GraphiQLExplorer from "graphiql-explorer"

import {
  GraphQLObjectType,
  isObjectType,
  getNamedType,
  assertObjectType
} from "graphql"
import { useStoreState } from "../store"
import { useState } from "react"

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
  const [isExplorerOpen, setIsExplorerOpen] = useState(true)

  // const currentTryItOutOperationName = useStoreState(
  //   state => state.currentTryItOutOperationName
  // )
  const schema = useStoreState(state => state.graphqlSchema)

  // const queryType = schema.getQueryType()
  // const queryOperations = queryType.getFields()

  // const currentOperation = queryOperations[currentTryItOutOperationName]

  // const operationType = assertObjectType(getNamedType(currentOperation.type))
  // const operationFields = operationType.getFields()

  return (
    <section className="flex w-full h-full">
      <GraphiQLExplorer schema={schema} explorerIsOpen={isExplorerOpen} />
      <GraphiQL
        fetcher={graphQLFetcher}
        //   query={`
        //   query {
        //     ${currentTryItOutOperationName} {
        //     ${Object.entries(operationFields)
        //       .map(([fieldName, node]) => {
        //         console.log({ fieldName, node })
        //         return fieldName
        //       })
        //       .join("\n         ")}
        //     }
        //   }
        // `}
      >
        <GraphiQL.Toolbar>
          <GraphiQL.Button
            onClick={() => setIsExplorerOpen(!isExplorerOpen)}
            label="Explorer"
            title="Toggle Explorer"
          />
        </GraphiQL.Toolbar>
      </GraphiQL>
    </section>
  )
}
