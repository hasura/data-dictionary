import { createClient } from "../generated-gql-client"

export const client = createClient({
  url: process.env.NEXT_PUBLIC_REACT_APP_URL + "/api/graphql",
})
