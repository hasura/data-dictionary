import { createClient } from "../generated-gql-client"

export const client = createClient({
  url: "/api/graphql",
  headers: {
    "Some-Identifier-Here-Later": "some-value"
  }
})
