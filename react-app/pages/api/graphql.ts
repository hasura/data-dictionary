import { ApolloServer, gql } from "apollo-server-micro"
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"

import sqlQuery from "../../graphql-server-utils/sql"
import {
  createHasuraMetadataClient,
  postgresMetadataQueryToGQLResult,
  runSQL
} from "../../graphql-server-utils/utils"

// TODO: Move this externally, and then import to keep this file cleaner/smaller
const typeDefs = gql`
  # JSON Object scalar comes from "graphql-type-json" library
  scalar JSON
  scalar JSONObject

  ###########################################

  type Query {
    metadata: HasuraMetadata
    postgres: Postgres
  }

  ###########################################

  type Postgres {
    schemas: [Schema]
  }

  type Schema {
    name: String!
    tables: [PostgresTable!]
    views: [PostgresView!]
    # functions: [PostgresFunction!]
  }

  interface BelongsToTable {
    table_schema: String!
    table_name: String!
  }

  type PostgresView {
    table_schema: String!
    table_name: String!
    comment: String
    columns: [PostgresColumn!]
  }

  type PostgresTable {
    table_schema: String!
    table_name: String!
    comment: String
    columns: [PostgresColumn!]
    primary_key: PostgresPrimaryKey
    foreign_keys: [PostgresForeignKey]
    indexes: [PostgresIndex]
  }

  # Using: columns.sql
  type PostgresColumn implements BelongsToTable {
    table_schema: String!
    table_name: String!
    column_name: String!
    column_default: String
    is_nullable: String!
    data_type: String! # integer
    udt_name: String! # int4
    comment: String
  }

  # Using: indexes.sql
  type PostgresIndex implements BelongsToTable {
    table_schema: String!
    table_name: String!
    index_name: String!
    index_type: String!
    index_keys: [String!]!
    is_unique: String!
    is_primary: String!
    is_partial: String!
  }

  # Using: primary_keys.sql (NOTE: indexes.sql returns "is_primary" as well, could use that)
  type PostgresPrimaryKey implements BelongsToTable {
    table_schema: String!
    table_name: String!
    constraint_name: String!
    columns: [String!]!
  }

  # Using: foreign_keys.sql
  type PostgresForeignKey implements BelongsToTable {
    table_schema: String!
    table_name: String!
    constraint_name: String!
    ref_table_table_schema: String!
    ref_table: String!
    column_mapping: JSONObject!
  }

  type HasuraMetadata {
    version: Int!
    tables: [TableEntry]
    actions: [Action]
    custom_types: CustomTypes
    functions: [CustomFunction]
    remote_schemas: [RemoteSchema]
    query_collections: [QueryCollectionEntry]
    allowlist: [AllowList]
    cron_triggers: [CronTrigger]
  }

  type TableEntry {
    table: QualifiedTable
    is_enum: Boolean
    configuration: TableConfig
    event_triggers: [EventTrigger]
    computed_fields: [ComputedField]
    object_relationships: [ObjectRelationship]
    array_relationships: [ArrayRelationship]
    remote_relationships: [RemoteRelationship]
    insert_permissions: [InsertPermissionEntry]
    select_permissions: [SelectPermissionEntry]
    update_permissions: [UpdatePermissionEntry]
    delete_permissions: [DeletePermissionEntry]
  }

  # union QualifiedTable = QualifiedTable | String

  type QualifiedTable {
    name: String!
    schema: String!
  }

  type Action {
    name: String!
    definition: ActionDefinition!
    comment: String
    permissions: [ActionPermission]
  }

  type ActionPermission {
    role: String!
  }

  type ActionDefinition {
    arguments: [InputArgument]
    output_type: String
    kind: String
    headers: [Header]
    forward_client_headers: Boolean
    handler: String!
    type: String!
  }

  type InputArgument {
    name: String!
    type: String!
  }

  type HeaderFromEnv {
    name: String
    value_from_env: String
  }

  type HeaderFromValue {
    name: String
    value: String
  }

  union Header = HeaderFromEnv | HeaderFromValue

  type TableConfig {
    custom_root_fields: CustomRootFields
    custom_column_names: JSONObject
  }

  type CustomRootFields {
    select: String
    select_by_pk: String
    select_aggregate: String
    insert: String
    insert_one: String
    update: String
    update_by_pk: String
    delete: String
    delete_by_pk: String
  }

  type EventTrigger {
    name: String!
    definition: EventTriggerDefinition
    retry_conf: RetryConf
    webhook: String
    webhook_from_env: String!
    headers: [Header]
  }

  type EventTriggerDefinition {
    enable_manual: Boolean!
    insert: OperationSpec
    delete: OperationSpec
    update: OperationSpec
  }

  type OperationSpec {
    columns: [String!]!
    payload: [String]
  }

  type RetryConf {
    num_retries: Int
    interval_sec: Int
    timeout_sec: Int
  }

  type ComputedField {
    name: String!
    definition: ComputedFieldDefinition
    comment: String
  }

  # type QualifiedFunction = QualifiedFunction | String

  type QualifiedFunction {
    name: String!
    schema: String!
  }

  type ComputedFieldDefinition {
    function: QualifiedFunction!
    table_argument: String
    session_argument: String
  }

  type ObjectRelationship {
    name: String!
    using: ObjRelUsing!
    comment: String
  }

  type ObjRelUsing {
    foreign_key_constraint_on: String
    manual_configuration: ObjRelUsingManualMapping
  }

  type ObjRelUsingManualMapping {
    remote_table: QualifiedTable!
    column_mapping: JSONObject!
  }

  type ArrayRelationship {
    name: String!
    using: ArrRelUsing!
    comment: String
  }

  type ArrRelUsing {
    foreign_key_constraint_on: ArrRelUsingFKeyOn
    manual_configuration: ArrRelUsingManualMapping
  }

  type ArrRelUsingFKeyOn {
    column: String!
    table: QualifiedTable!
  }

  type ArrRelUsingManualMapping {
    remote_table: QualifiedTable!
    column_mapping: JSONObject!
  }

  type RemoteRelationship {
    name: String!
    definition: RemoteRelationshipDef
  }

  type RemoteRelationshipDef {
    hasura_fields: [String!]!
    remote_schema: String!
    # The actual type is more strict than JSON Object but can't be modeled with GraphQL honestly
    remote_field: JSONObject
  }

  type InsertPermissionEntry {
    role: String!
    permission: InsertPermission!
    comment: String
  }

  type InsertPermission {
    check: JSONObject
    set: JSONObject
    columns: [String!]!
    backend_only: Boolean
  }

  type SelectPermissionEntry {
    role: String!
    permission: SelectPermission!
    comment: String
  }

  type SelectPermission {
    columns: [String!]!
    computed_fields: [String]
    limit: Int
    allow_aggregations: Boolean
    filter: JSONObject
  }

  type UpdatePermissionEntry {
    role: String!
    permission: UpdatePermission!
    comment: String
  }

  type UpdatePermission {
    check: JSONObject
    set: JSONObject
    columns: [String!]!
    filter: JSONObject
  }

  type DeletePermissionEntry {
    role: String!
    permission: DeletePermission!
    comment: String
  }

  type DeletePermission {
    filter: JSONObject
  }

  type CustomTypes {
    input_objects: [InputObjectType]
    objects: [ObjectType]
    scalars: [ScalarType]
    enums: [EnumType]
  }

  type InputObjectType {
    name: String!
    fields: [InputObjectField!]!
    description: String
  }

  type InputObjectField {
    name: String!
    type: String!
    description: String
  }

  type ObjectType {
    name: String!
    fields: [ObjectField!]!
    relationships: [CustomTypeObjectRelationship]
    description: String
  }

  type ObjectField {
    name: String!
    type: String!
    description: String
  }

  type CustomTypeObjectRelationship {
    name: String!
    type: String!
    remote_table: QualifiedTable!
    field_mapping: JSONObject!
  }

  type ScalarType {
    name: String!
    description: String
  }

  type EnumType {
    name: String!
    values: [EnumValue!]!
    description: String
  }

  type EnumValue {
    value: String!
    is_deprecated: Boolean
    description: String
  }

  type CustomFunction {
    function: QualifiedFunction!
    configuration: FunctionConfiguration
  }

  type FunctionConfiguration {
    session_argument: String
  }

  type RemoteSchema {
    name: String!
    definition: RemoteSchemaDef!
    comment: String
  }

  type RemoteSchemaDef {
    url: String
    url_from_env: String
    headers: [Header]
    forward_client_headers: Boolean
    timeout_seconds: Int
  }

  type QueryCollectionEntry {
    name: String!
    definition: QueryCollectionDefinition!
    comment: String
  }

  type QueryCollectionDefinition {
    queries: [QueryCollection!]!
  }

  type QueryCollection {
    name: String!
    query: String!
  }

  type AllowList {
    collection: String!
  }

  type CronTrigger {
    name: String!
    webhook: String!
    schedule: String!
    payload: JSONObject
    headers: [Header!]!
    retry_conf: RetryConfST
    include_in_metadata: Boolean!
    comment: String
  }

  type RetryConfST {
    num_retries: Int
    retry_interval_seconds: Int
    timeout_seconds: Int
    tolerance_seconds: Int
  }
`

// TODO: Environment variable for endpoint or something
const runMetadataQuery = createHasuraMetadataClient({
  endpoint: process.env.NEXT_PUBLIC_HASURA_URL
    ? process.env.NEXT_PUBLIC_HASURA_URL + "/v1/query"
    : "http://localhost:8085/v1/query",
  headers: {
    "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET || "mysecret"
  }
})

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    metadata: async () => {
      const request = await runMetadataQuery({
        type: "export_metadata",
        args: {}
      })
      return request.json()
    },
    postgres: async () => {
      // Declare series of uninvoked promises, for non-blocking parallel fetch below
      const getColumns = runSQL(
        runMetadataQuery,
        `
      select
          table_schema,
          table_name,
          column_name,
          column_default,
          is_nullable::bool,
          data_type,
          udt_name,
          pg_catalog.col_description(
              format('%s.%s', col.table_schema, col.table_name)::regclass::oid,
              col.ordinal_position
          ) as comment
      from
          information_schema.columns as col
      where
          col.table_schema not in ('pg_catalog', 'information_schema', 'hdb_catalog')
      `
      )
      const getTables = runSQL(
        runMetadataQuery,
        `
      SELECT
        c.oid AS id,
        table_catalog AS catalog,
        table_schema,
        table_name,
        obj_description(c.oid) AS comment
      FROM
        information_schema.tables
        JOIN pg_class c ON quote_ident(table_schema)::regnamespace = c.relnamespace
        AND c.relname = table_name
        LEFT JOIN pg_stat_user_tables ON pg_stat_user_tables.schemaname = tables.table_schema
        AND pg_stat_user_tables.relname = tables.table_name
      WHERE
        table_type = 'BASE TABLE'
        AND table_schema not in ('hdb_catalog', 'pg_catalog', 'information_schema');
      `
      )
      const getViews = runSQL(
        runMetadataQuery,
        `
      select t.table_schema,
            t.table_name,
            obj_description(pg_class.oid) as comment
            from information_schema.tables t
          inner join pg_class
                  on pg_class.relname = t.table_name
      where table_type = 'VIEW' 
            and t.table_schema not in ('information_schema', 'pg_catalog')
      order by table_schema,
              table_name;
      `
      )
      const getIndexes = runSQL(
        runMetadataQuery,
        `
      SELECT
        U.usename                AS user_name,
        ns.nspname               AS table_schema,
        idx.indrelid :: REGCLASS AS table_name,
        i.relname                AS index_name,
        idx.indisunique          AS is_unique,
        idx.indisprimary         AS is_primary,
        am.amname                AS index_type,
        idx.indkey,
            ARRAY_TO_JSON(ARRAY(
                SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE)
                FROM
                  generate_subscripts(idx.indkey, 1) AS k
                ORDER BY k
            )) AS index_keys,
        (idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional,
        idx.indpred IS NOT NULL AS is_partial
      FROM pg_index AS idx
        JOIN pg_class AS i
          ON i.oid = idx.indexrelid
        JOIN pg_am AS am
          ON i.relam = am.oid
        JOIN pg_namespace AS NS ON i.relnamespace = NS.OID
        JOIN pg_user AS U ON i.relowner = U.usesysid
      WHERE NOT nspname LIKE 'pg%'; -- Excluding system tables`
      )
      const getPrimaryKeys = runSQL(
        runMetadataQuery,
        `
      SELECT
          tc.table_schema,
          tc.table_name,
          tc.constraint_name,
          json_agg(constraint_column_usage.column_name) AS columns
      FROM
          information_schema.table_constraints tc
      JOIN (
        SELECT
          x.tblschema AS table_schema,
          x.tblname AS table_name,
          x.colname AS column_name,
          x.cstrname AS constraint_name
        FROM ( SELECT DISTINCT
            nr.nspname,
            r.relname,
            a.attname,
            c.conname
          FROM
            pg_namespace nr,
            pg_class r,
            pg_attribute a,
            pg_depend d,
            pg_namespace nc,
            pg_constraint c
          WHERE
            nr.oid = r.relnamespace
            AND r.oid = a.attrelid
            AND d.refclassid = 'pg_class'::regclass::oid
            AND d.refobjid = r.oid
            AND d.refobjsubid = a.attnum
            AND d.classid = 'pg_constraint'::regclass::oid
            AND d.objid = c.oid
            AND c.connamespace = nc.oid
            AND c.contype = 'c'::"char"
            AND(r.relkind = ANY (ARRAY ['r'::"char", 'p'::"char"]))
            AND NOT a.attisdropped
          UNION ALL
          SELECT
            nr.nspname,
            r.relname,
            a.attname,
            c.conname
          FROM
            pg_namespace nr,
            pg_class r,
            pg_attribute a,
            pg_namespace nc,
            pg_constraint c
          WHERE
            nr.oid = r.relnamespace
            AND r.oid = a.attrelid
            AND nc.oid = c.connamespace
            AND r.oid = CASE c.contype
            WHEN 'f'::"char" THEN
              c.confrelid
            ELSE
              c.conrelid
            END
            AND(a.attnum = ANY (
                CASE c.contype
                WHEN 'f'::"char" THEN
                  c.confkey
                ELSE
                  c.conkey
                END))
            AND NOT a.attisdropped
            AND(c.contype = ANY (ARRAY ['p'::"char", 'u'::"char", 'f'::"char"]))
            AND(r.relkind = ANY (ARRAY ['r'::"char", 'p'::"char"]))) x (tblschema, tblname, colname, cstrname)) constraint_column_usage ON tc.constraint_name::text = constraint_column_usage.constraint_name::text
        AND tc.table_schema::text = constraint_column_usage.table_schema::text
        AND tc.table_name::text = constraint_column_usage.table_name::text
        AND tc.constraint_type::text = 'PRIMARY KEY'::text
      GROUP BY
        tc.table_schema, tc.table_name, tc.constraint_name;      
      `
      )
      const getForeignKeys = runSQL(
        runMetadataQuery,
        `
      SELECT
        q.table_schema::text AS table_schema,
        q.table_name::text AS table_name,
        q.constraint_name::text AS constraint_name,
        min(q.ref_table_table_schema::text) AS ref_table_table_schema,
        min(q.ref_table::text) AS ref_table,
        json_object_agg(ac.attname, afc.attname) AS column_mapping,
        min(q.confupdtype::text) AS on_update,
        min(q.confdeltype::text) AS
        on_delete
      FROM (
        SELECT
          ctn.nspname AS table_schema,
          ct.relname AS table_name,
          r.conrelid AS table_id,
          r.conname AS constraint_name,
          cftn.nspname AS ref_table_table_schema,
          cft.relname AS ref_table,
          r.confrelid AS ref_table_id,
          r.confupdtype,
          r.confdeltype,
          unnest(r.conkey) AS column_id,
          unnest(r.confkey) AS ref_column_id
        FROM
          pg_constraint r
          JOIN pg_class ct ON r.conrelid = ct.oid
          JOIN pg_namespace ctn ON ct.relnamespace = ctn.oid
          JOIN pg_class cft ON r.confrelid = cft.oid
          JOIN pg_namespace cftn ON cft.relnamespace = cftn.oid
      WHERE
        r.contype = 'f'::"char"
      
        ) q
        JOIN pg_attribute ac ON q.column_id = ac.attnum
          AND q.table_id = ac.attrelid
        JOIN pg_attribute afc ON q.ref_column_id = afc.attnum
          AND q.ref_table_id = afc.attrelid
        GROUP BY
          q.table_schema,
          q.table_name,
          q.constraint_name
      `
      )
      const data = {
        columns: await getColumns,
        tables: await getTables,
        views: await getViews,
        indexes: await getIndexes,
        primaryKeys: await getPrimaryKeys,
        foreignKeys: await getForeignKeys
      }
      return postgresMetadataQueryToGQLResult(data as any)
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: "/api/graphql" })

export const config = {
  api: {
    bodyParser: false
  }
}
