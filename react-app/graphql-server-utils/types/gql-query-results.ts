export interface GQLPostgresQueryResult {
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
