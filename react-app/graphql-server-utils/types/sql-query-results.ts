export interface PostgresMetadataQueryResult {
  columns: Column[]
  tables: Table[]
  views: View[]
  indexes: Index[]
  primaryKeys: PrimaryKey[]
  foreignKeys: ForeignKey[]
}

export interface Column {
  table_schema: string
  table_name: string
  column_name: string
  column_default: number | string
  is_nullable: PostgresBoolean
  data_type: string
  udt_name: string
  comment: string
}

export type PostgresBoolean = "t" | "f"

export interface ForeignKey {
  table_schema: string
  table_name: string
  constraint_name: string
  ref_table_table_schema: string
  ref_table: string
  column_mapping: Record<string, string>
  on_update: string
  on_delete: string
}

export interface Index {
  user_name: string
  table_schema: string
  table_name: string
  index_name: string
  is_unique: PostgresBoolean
  is_primary: PostgresBoolean
  index_type: string
  indkey: number | string
  index_keys: string[]
  is_functional: PostgresBoolean
  is_partial: PostgresBoolean
}

export interface PrimaryKey {
  table_schema: string
  table_name: string
  constraint_name: string
  columns: string[]
}

export interface Table {
  id: number
  catalog: string
  table_schema: string
  table_name: string
  comment: string
}

export interface View {
  table_schema: string
  table_name: string
  comment: string
}
