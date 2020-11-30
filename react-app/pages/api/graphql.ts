import { ApolloServer } from "apollo-server-micro"
import { typeDefs } from "../../graphql-server-utils/schema"
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"

import {
  sqlQuery,
  createHasuraMetadataClient,
  postgresMetadataQueryToGQLResult,
} from "../../graphql-server-utils/utils"

import { getColumns } from "../../graphql-server-utils/sql-queries/columns.queries"
import { getForeignKeys } from "../../graphql-server-utils/sql-queries/foreign-keys.queries"
import { getIndexes } from "../../graphql-server-utils/sql-queries/indexes.queries"
import { getPrimaryKeys } from "../../graphql-server-utils/sql-queries/primary-keys.queries"
import { getChecks } from "../../graphql-server-utils/sql-queries/checks.queries"
import { getTables } from "../../graphql-server-utils/sql-queries/tables.queries"
import { getViews } from "../../graphql-server-utils/sql-queries/views.queries"

const runMetadataQuery = createHasuraMetadataClient({
  endpoint: process.env.NEXT_PUBLIC_HASURA_URL
    ? process.env.NEXT_PUBLIC_HASURA_URL + "/v1/query"
    : "http://localhost:8085/v1/query",
  headers: {
    "X-Hasura-Admin-Secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
})

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    metadata: async () => {
      const request = await runMetadataQuery({
        type: "export_metadata",
        args: {},
      })
      return request.json()
    },
    postgres: async () => {
      const data = {
        columns: await sqlQuery({
          query: getColumns,
          metadataClientQuery: runMetadataQuery,
        }),
        tables: await sqlQuery({
          query: getTables,
          metadataClientQuery: runMetadataQuery,
        }),
        views: await sqlQuery({
          query: getViews,
          metadataClientQuery: runMetadataQuery,
        }),
        indexes: await sqlQuery({
          query: getIndexes,
          metadataClientQuery: runMetadataQuery,
        }),
        primaryKeys: await sqlQuery({
          query: getPrimaryKeys,
          metadataClientQuery: runMetadataQuery,
        }),
        foreignKeys: await sqlQuery({
          query: getForeignKeys,
          metadataClientQuery: runMetadataQuery,
        }),
        checks: await sqlQuery({
          query: getChecks,
          metadataClientQuery: runMetadataQuery,
        }),
      }
      return postgresMetadataQueryToGQLResult(data)
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: "/api/graphql" })

export const config = {
  api: {
    bodyParser: false,
  },
}
