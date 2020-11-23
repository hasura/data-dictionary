import GraphiQL from "graphiql"
import "graphiql/graphiql.css"

import GraphiQLExplorer from "graphiql-explorer"

import {
  GraphQLObjectType,
  isObjectType,
  getNamedType,
  assertObjectType,
} from "graphql"

import { useStoreState } from "../store"
import { useState } from "react"

const HASURA_ENDPOINT = process.env.NEXT_PUBLIC_HASURA_URL
  ? process.env.NEXT_PUBLIC_HASURA_URL + "/v1/graphql"
  : "http://localhost:8085/v1/graphql"

function graphQLFetcher(graphQLParams) {
  return fetch(HASURA_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

export const GraphiQLRenderer = () => {
  const [currentQuery, setCurrentQuery] = useState("")
  const [isExplorerOpen, setIsExplorerOpen] = useState(true)
  const [graphiQLRef, setGraphiQLRef] = useState<GraphiQL>()

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
      <GraphiQLExplorer
        width={300}
        schema={schema}
        query={currentQuery}
        onEdit={setCurrentQuery}
        makeDefaultArg={() => false}
        explorerIsOpen={isExplorerOpen}
        getDefaultScalarArgValue={(parentField, arg, argType) =>
          GraphiQLExplorer.defaultValue(argType)
        }
      />
      <GraphiQL
        ref={graphiQL => setGraphiQLRef(graphiQL!)}
        query={currentQuery}
        fetcher={graphQLFetcher}
        onEditQuery={query => setCurrentQuery(query as string)}
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
            onClick={() => graphiQLRef?.handlePrettifyQuery()}
            label="Prettify"
            title="Prettify Query (Shift-Ctrl-P)"
          />
          <GraphiQL.Button
            onClick={() => graphiQLRef?.handleToggleHistory()}
            label="History"
            title="Show History"
          />
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
