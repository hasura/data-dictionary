import { gql } from "apollo-server-micro"

export const typeDefs = gql`
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
    checks: [PostgresCheck]
    indexes: [PostgresIndex]
  }

  # Using: checks.sql
  type PostgresCheck implements BelongsToTable {
    table_schema: String!
    table_name: String!
    constraint_name: String!
    column_name: String!
    definition: String!
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

  # The "columns" value can either be "*" for "all columns", an array of strings for column names
  union OperationSpec = OperationSpecAllColumns | OperationSpecIndividualColumns

  # Case when columns = "*"
  type OperationSpecAllColumns {
    columns: String!
    payload: [String!]
  }

  # Case when individual columns provided
  type OperationSpecIndividualColumns {
    columns: [String!]!
    payload: [String!]
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
