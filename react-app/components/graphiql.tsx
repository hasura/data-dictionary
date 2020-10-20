import GraphiQL from "graphiql"
import "graphiql/graphiql.css"

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
  return <GraphiQL fetcher={graphQLFetcher} />
}
