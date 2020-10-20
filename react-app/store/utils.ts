import * as _ from "lodash"
import type { MetadataAndPostgresQueryResult } from "../utils/querySelectionSets"

interface GroupMetadataAndPostgresInfoParams {
  metadata: MetadataAndPostgresQueryResult["metadata"]
  postgres: MetadataAndPostgresQueryResult["postgres"]
}

/**
 * Takes the "Metadata" and "Postgres" query results from GraphQL API service,
 * and combines the table values by grouping/keying them by table name
 */
export function groupMetadataAndPostgresInfoByTableName(
  params: GroupMetadataAndPostgresInfoParams
) {
  const combinedTables = params.metadata?.tables.map(metadataTable => {
    const allTables = params.postgres?.schemas.map(schema => schema.tables)
    const table = _.flatten(allTables).find(it => it.table_name == metadataTable.table.name)
    return { ...metadataTable, database_table: table }
  })
  return _.keyBy(combinedTables, it => it.table.name)
}

export type GroupedMetadataAndPostgresTables = ReturnType<
  typeof groupMetadataAndPostgresInfoByTableName
>
