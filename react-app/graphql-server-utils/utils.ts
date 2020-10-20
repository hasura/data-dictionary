import fetch from "isomorphic-fetch"

import { GQLPostgresQueryResult } from "./types/gql-query-results"
import { PostgresMetadataQueryResult } from "./types/sql-query-results"

export async function runSQL(
  metadataClientQuery: ReturnType<typeof createHasuraMetadataClient>,
  query: string
) {
  const request = await metadataClientQuery({
    type: "run_sql",
    args: {
      sql: query
    }
  })
  const response = await request.json()
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
export function convertRunSQLTuplesToArrayOfObjects(tuples: string[][]) {
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

export const createHasuraMetadataClient = (
  config: CreateClientParams
) => async (payload: Record<string, any>) => {
  return fetch(config.endpoint, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(payload)
  })
}

export function postgresMetadataQueryToGQLResult(
  metadata: PostgresMetadataQueryResult
): GQLPostgresQueryResult {
  const allSchemas = Array.from(
    new Set(metadata.tables.map(it => it.table_schema))
  )

  const result: GQLPostgresQueryResult = {
    schemas: allSchemas.map(schemaName => ({
      name: schemaName,
      tables: metadata.tables
        .filter(it => it.table_schema == schemaName)
        .map(table => ({
          table_schema: table.table_schema,
          table_name: table.table_name,
          comment: table.comment,
          columns: metadata.columns.filter(
            it => it.table_name == table.table_name
          ),
          primary_key: metadata.primaryKeys.find(
            it => it.table_name == table.table_name
          )!,
          foreign_keys: metadata.foreignKeys.filter(
            it => it.table_name == table.table_name
          ),
          indexes: metadata.indexes.filter(
            it => it.table_name == table.table_name
          )
        })),
      views: metadata.views
        .filter(it => it.table_schema == schemaName)
        .map(view => ({
          table_schema: view.table_schema,
          table_name: view.table_name,
          comment: view.comment,
          columns: metadata.columns.filter(
            it => it.table_name == view.table_name
          ),
          primary_key: metadata.primaryKeys!.find(
            it => it.table_name == view.table_name
          ),
          foreign_keys: metadata.foreignKeys.filter(
            it => it.table_name == view.table_name
          )
        }))
    }))
  }
  return result
}
