import fs from "fs"
import path from "path"

import fetch from "cross-fetch"

import Fastify from "fastify"
import fastifyGql from "fastify-gql"
import fastifyCORS from "fastify-cors"

import { makeExecutableSchema } from "graphql-tools"
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"

import sqlQuery from "../sql"

import { postgresMetadataQueryToGQLResult } from "./utils"

const app = Fastify({ logger: true })

async function runSQL(
  metadataClientQuery: ReturnType<typeof createHasuraMetadataClient>,
  query: string
) {
  const request = await metadataClientQuery({
    type: "run_sql",
    args: {
      sql: query,
    },
  })
  const response = await request.json()
  console.log("runSQL response", response)
  return convertRunSQLTuplesToArrayOfObjects(response.result)
}

/**
 * @example
 * const request = await fetch('http://localhost:8080/v1/query', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     type: 'run_sql',
 *     args: {
 *       sql: `
 *         select *
 *         from information_schema.columns
 *         where table_schema = 'public'
 *       `
 *     },
 *   })
 * })
 *
 * const data = await request.json()
 * convertRunSQLTuplesToArrayOfObjects(data.result)
 **/
function convertRunSQLTuplesToArrayOfObjects(tuples: string[][]) {
  const results = []
  const headers = tuples.shift()
  if (!headers) throw new Error("Empty tuples given")

  for (const row of tuples) {
    const record: Record<string, string> = {}
    row.forEach((val, idx) => {
      const column = headers[idx]
      // Try to JSON parse the column to check if it's a stringified array/object
      // TODO: Maybe do a String.replace() to swap any "{}" with "[]" to handle PG arrays
      try {
        const parsed = JSON.parse(val)
        record[column] = parsed
      } catch (e) {
        record[column] = val
      }
    })
    results.push(record)
  }

  return results
}

interface CreateClientParams {
  endpoint: string
  headers?: Record<string, any>
}

const createHasuraMetadataClient = (config: CreateClientParams) => async (
  payload: Record<string, any>
) => {
  return fetch(config.endpoint, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(payload),
  })
}

const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf-8"
)

const runMetadataQuery = createHasuraMetadataClient({
  endpoint: "http://localhost:8085/v1/query",
  headers: { "X-Hasura-Admin-Secret": "mysecret" },
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
      // Declare series of uninvoked promises, for non-blocking parallel fetch below
      const getColumns = runSQL(runMetadataQuery, sqlQuery.columns)
      const getTables = runSQL(runMetadataQuery, sqlQuery.tables)
      const getViews = runSQL(runMetadataQuery, sqlQuery.views)
      const getIndexes = runSQL(runMetadataQuery, sqlQuery.indexes)
      const getPrimaryKeys = runSQL(runMetadataQuery, sqlQuery.primary_keys)
      const getForeignKeys = runSQL(runMetadataQuery, sqlQuery.foreign_keys)
      const data = {
        columns: await getColumns,
        tables: await getTables,
        views: await getViews,
        indexes: await getIndexes,
        primaryKeys: await getPrimaryKeys,
        foreignKeys: await getForeignKeys,
      }
      return postgresMetadataQueryToGQLResult(data as any)
    },
  },
}

app.register(fastifyCORS, {
  origin: "*",
})

app.register(fastifyGql, {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  graphiql: "playground",
})

app.listen(4000, "0.0.0.0", (err, address) => {
  if (err) console.log("Error:", err)
  else console.log("Listening on", address)
})
