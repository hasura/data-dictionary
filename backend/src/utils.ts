import faker from "faker"
import { PostgresMetadataQueryResult } from "./types/sql-query-results"

interface GQLPostgresQueryResult {
  schemas: GQLPostgresSchema[]
}

interface GQLPostgresSchema {
  name: string
  tables: PostgresTable[]
  views: PostgresView[]
}

interface PostgresView {
  table_schema: string
  table_name: string
  comment?: string
  columns: PostgresColumn[]
}

interface PostgresTable {
  table_schema: string
  table_name: string
  comment?: string
  columns: PostgresColumn[]
  primary_key: PostgresPrimaryKey
  foreign_keys: PostgresForeignKey[]
  indexes: PostgresIndex[]
}

interface PostgresIndex {
  user_name: string
  table_schema: string
  table_name: string
  index_name: string
  is_unique: "t" | "f"
  is_primary: "t" | "f"
  index_type: string
  indkey: number | string
  index_keys: string[]
  is_functional: "t" | "f"
  is_partial: "t" | "f"
}

interface PostgresColumn {
  table_schema: string
  table_name: string
  column_name: string
  column_default: number | string
  is_nullable: "t" | "f"
  data_type: string
  udt_name: string
}

interface PostgresPrimaryKey {
  table_schema: string
  table_name: string
  constraint_name: string
  columns: string[]
}

interface PostgresForeignKey {
  table_schema: string
  table_name: string
  constraint_name: string
  ref_table_table_schema: string
  ref_table: string
  column_mapping: Record<string, any>
}

///////////////////////////////////////////////////

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
          ),
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
          ),
        })),
    })),
  }
  return result
}

function getBytes(object: any) {
  const bytes = new TextEncoder().encode(JSON.stringify(object)).length
  const kiloBytes = bytes / 1024
  const megaBytes = kiloBytes / 1024
  return { bytes, kiloBytes, megaBytes }
}

export function allocateBytes(size: number) {
  return Array(size / 2).fill(1)
}

export function allocateKilobytes(size: number) {
  return allocateBytes(size * 1024)
}

export function allocateMegabytes(size: number) {
  return allocateKilobytes(size * 1024)
}

export function generateWordArrayOfByteSize(size: number) {
  const results: string[] = []
  while (getBytes(results).bytes <= size) {
    results.push(faker.random.word())
  }
  return results
}
