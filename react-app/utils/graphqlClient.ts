import { createClient } from "../generated-gql-client"

export const client = createClient({
  url: "http://localhost:3000/api/graphql",
  headers: {
    "Some-Identifier-Here-Later": "some-value"
  }
})
