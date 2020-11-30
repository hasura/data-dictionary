import { IGetChecksResult } from "../sql-queries/checks.queries"
import type { IGetColumnsResult } from "../sql-queries/columns.queries"
import type { IGetForeignKeysResult } from "../sql-queries/foreign-keys.queries"
import type { IGetIndexesResult } from "../sql-queries/indexes.queries"
import type { IGetPrimaryKeysResult } from "../sql-queries/primary-keys.queries"
import type { IGetTablesResult } from "../sql-queries/tables.queries"
import type { IGetViewsResult } from "../sql-queries/views.queries"

export interface PostgresMetadataQueryResult {
  columns: IGetColumnsResult[]
  tables: IGetTablesResult[]
  views: IGetViewsResult[]
  indexes: IGetIndexesResult[]
  primaryKeys: IGetPrimaryKeysResult[]
  foreignKeys: IGetForeignKeysResult[]
  checks: IGetChecksResult[]
}
