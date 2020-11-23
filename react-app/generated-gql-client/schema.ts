import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    JSON: any,
    JSONObject: any,
    String: string,
    Int: number,
    Boolean: boolean,
    Upload: any,
}

export interface Query {
    metadata?: HasuraMetadata
    postgres?: Postgres
    __typename?: 'Query'
}

export interface Postgres {
    schemas?: (Schema | undefined)[]
    __typename?: 'Postgres'
}

export interface Schema {
    name: Scalars['String']
    tables?: PostgresTable[]
    views?: PostgresView[]
    __typename?: 'Schema'
}

export type BelongsToTable = (PostgresColumn | PostgresIndex | PostgresPrimaryKey | PostgresForeignKey) & { __isUnion?: true }

export interface PostgresView {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    comment?: Scalars['String']
    columns?: PostgresColumn[]
    __typename?: 'PostgresView'
}

export interface PostgresTable {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    comment?: Scalars['String']
    columns?: PostgresColumn[]
    primary_key?: PostgresPrimaryKey
    foreign_keys?: (PostgresForeignKey | undefined)[]
    indexes?: (PostgresIndex | undefined)[]
    __typename?: 'PostgresTable'
}

export interface PostgresColumn {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    column_name: Scalars['String']
    column_default?: Scalars['String']
    is_nullable: Scalars['String']
    data_type: Scalars['String']
    udt_name: Scalars['String']
    comment?: Scalars['String']
    __typename?: 'PostgresColumn'
}

export interface PostgresIndex {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    index_name: Scalars['String']
    index_type: Scalars['String']
    index_keys: Scalars['String'][]
    is_unique: Scalars['String']
    is_primary: Scalars['String']
    is_partial: Scalars['String']
    __typename?: 'PostgresIndex'
}

export interface PostgresPrimaryKey {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    constraint_name: Scalars['String']
    columns: Scalars['String'][]
    __typename?: 'PostgresPrimaryKey'
}

export interface PostgresForeignKey {
    table_schema: Scalars['String']
    table_name: Scalars['String']
    constraint_name: Scalars['String']
    ref_table_table_schema: Scalars['String']
    ref_table: Scalars['String']
    column_mapping: Scalars['JSONObject']
    __typename?: 'PostgresForeignKey'
}

export interface HasuraMetadata {
    version: Scalars['Int']
    tables?: (TableEntry | undefined)[]
    actions?: (Action | undefined)[]
    custom_types?: CustomTypes
    functions?: (CustomFunction | undefined)[]
    remote_schemas?: (RemoteSchema | undefined)[]
    query_collections?: (QueryCollectionEntry | undefined)[]
    allowlist?: (AllowList | undefined)[]
    cron_triggers?: (CronTrigger | undefined)[]
    __typename?: 'HasuraMetadata'
}

export interface TableEntry {
    table?: QualifiedTable
    is_enum?: Scalars['Boolean']
    configuration?: TableConfig
    event_triggers?: (EventTrigger | undefined)[]
    computed_fields?: (ComputedField | undefined)[]
    object_relationships?: (ObjectRelationship | undefined)[]
    array_relationships?: (ArrayRelationship | undefined)[]
    remote_relationships?: (RemoteRelationship | undefined)[]
    insert_permissions?: (InsertPermissionEntry | undefined)[]
    select_permissions?: (SelectPermissionEntry | undefined)[]
    update_permissions?: (UpdatePermissionEntry | undefined)[]
    delete_permissions?: (DeletePermissionEntry | undefined)[]
    __typename?: 'TableEntry'
}

export interface QualifiedTable {
    name: Scalars['String']
    schema: Scalars['String']
    __typename?: 'QualifiedTable'
}

export interface Action {
    name: Scalars['String']
    definition: ActionDefinition
    comment?: Scalars['String']
    permissions?: (ActionPermission | undefined)[]
    __typename?: 'Action'
}

export interface ActionPermission {
    role: Scalars['String']
    __typename?: 'ActionPermission'
}

export interface ActionDefinition {
    arguments?: (InputArgument | undefined)[]
    output_type?: Scalars['String']
    kind?: Scalars['String']
    headers?: (Header | undefined)[]
    forward_client_headers?: Scalars['Boolean']
    handler: Scalars['String']
    type: Scalars['String']
    __typename?: 'ActionDefinition'
}

export interface InputArgument {
    name: Scalars['String']
    type: Scalars['String']
    __typename?: 'InputArgument'
}

export interface HeaderFromEnv {
    name?: Scalars['String']
    value_from_env?: Scalars['String']
    __typename?: 'HeaderFromEnv'
}

export interface HeaderFromValue {
    name?: Scalars['String']
    value?: Scalars['String']
    __typename?: 'HeaderFromValue'
}

export type Header = (HeaderFromEnv | HeaderFromValue) & { __isUnion?: true }

export interface TableConfig {
    custom_root_fields?: CustomRootFields
    custom_column_names?: Scalars['JSONObject']
    __typename?: 'TableConfig'
}

export interface CustomRootFields {
    select?: Scalars['String']
    select_by_pk?: Scalars['String']
    select_aggregate?: Scalars['String']
    insert?: Scalars['String']
    insert_one?: Scalars['String']
    update?: Scalars['String']
    update_by_pk?: Scalars['String']
    delete?: Scalars['String']
    delete_by_pk?: Scalars['String']
    __typename?: 'CustomRootFields'
}

export interface EventTrigger {
    name: Scalars['String']
    definition?: EventTriggerDefinition
    retry_conf?: RetryConf
    webhook?: Scalars['String']
    webhook_from_env: Scalars['String']
    headers?: (Header | undefined)[]
    __typename?: 'EventTrigger'
}

export interface EventTriggerDefinition {
    enable_manual: Scalars['Boolean']
    insert?: OperationSpec
    delete?: OperationSpec
    update?: OperationSpec
    __typename?: 'EventTriggerDefinition'
}

export type OperationSpec = (OperationSpecAllColumns | OperationSpecIndividualColumns) & { __isUnion?: true }

export interface OperationSpecAllColumns {
    columns: Scalars['String']
    payload?: Scalars['String'][]
    __typename?: 'OperationSpecAllColumns'
}

export interface OperationSpecIndividualColumns {
    columns: Scalars['String'][]
    payload?: Scalars['String'][]
    __typename?: 'OperationSpecIndividualColumns'
}

export interface RetryConf {
    num_retries?: Scalars['Int']
    interval_sec?: Scalars['Int']
    timeout_sec?: Scalars['Int']
    __typename?: 'RetryConf'
}

export interface ComputedField {
    name: Scalars['String']
    definition?: ComputedFieldDefinition
    comment?: Scalars['String']
    __typename?: 'ComputedField'
}

export interface QualifiedFunction {
    name: Scalars['String']
    schema: Scalars['String']
    __typename?: 'QualifiedFunction'
}

export interface ComputedFieldDefinition {
    function: QualifiedFunction
    table_argument?: Scalars['String']
    session_argument?: Scalars['String']
    __typename?: 'ComputedFieldDefinition'
}

export interface ObjectRelationship {
    name: Scalars['String']
    using: ObjRelUsing
    comment?: Scalars['String']
    __typename?: 'ObjectRelationship'
}

export interface ObjRelUsing {
    foreign_key_constraint_on?: Scalars['String']
    manual_configuration?: ObjRelUsingManualMapping
    __typename?: 'ObjRelUsing'
}

export interface ObjRelUsingManualMapping {
    remote_table: QualifiedTable
    column_mapping: Scalars['JSONObject']
    __typename?: 'ObjRelUsingManualMapping'
}

export interface ArrayRelationship {
    name: Scalars['String']
    using: ArrRelUsing
    comment?: Scalars['String']
    __typename?: 'ArrayRelationship'
}

export interface ArrRelUsing {
    foreign_key_constraint_on?: ArrRelUsingFKeyOn
    manual_configuration?: ArrRelUsingManualMapping
    __typename?: 'ArrRelUsing'
}

export interface ArrRelUsingFKeyOn {
    column: Scalars['String']
    table: QualifiedTable
    __typename?: 'ArrRelUsingFKeyOn'
}

export interface ArrRelUsingManualMapping {
    remote_table: QualifiedTable
    column_mapping: Scalars['JSONObject']
    __typename?: 'ArrRelUsingManualMapping'
}

export interface RemoteRelationship {
    name: Scalars['String']
    definition?: RemoteRelationshipDef
    __typename?: 'RemoteRelationship'
}

export interface RemoteRelationshipDef {
    hasura_fields: Scalars['String'][]
    remote_schema: Scalars['String']
    remote_field?: Scalars['JSONObject']
    __typename?: 'RemoteRelationshipDef'
}

export interface InsertPermissionEntry {
    role: Scalars['String']
    permission: InsertPermission
    comment?: Scalars['String']
    __typename?: 'InsertPermissionEntry'
}

export interface InsertPermission {
    check?: Scalars['JSONObject']
    set?: Scalars['JSONObject']
    columns: Scalars['String'][]
    backend_only?: Scalars['Boolean']
    __typename?: 'InsertPermission'
}

export interface SelectPermissionEntry {
    role: Scalars['String']
    permission: SelectPermission
    comment?: Scalars['String']
    __typename?: 'SelectPermissionEntry'
}

export interface SelectPermission {
    columns: Scalars['String'][]
    computed_fields?: (Scalars['String'] | undefined)[]
    limit?: Scalars['Int']
    allow_aggregations?: Scalars['Boolean']
    filter?: Scalars['JSONObject']
    __typename?: 'SelectPermission'
}

export interface UpdatePermissionEntry {
    role: Scalars['String']
    permission: UpdatePermission
    comment?: Scalars['String']
    __typename?: 'UpdatePermissionEntry'
}

export interface UpdatePermission {
    check?: Scalars['JSONObject']
    set?: Scalars['JSONObject']
    columns: Scalars['String'][]
    filter?: Scalars['JSONObject']
    __typename?: 'UpdatePermission'
}

export interface DeletePermissionEntry {
    role: Scalars['String']
    permission: DeletePermission
    comment?: Scalars['String']
    __typename?: 'DeletePermissionEntry'
}

export interface DeletePermission {
    filter?: Scalars['JSONObject']
    __typename?: 'DeletePermission'
}

export interface CustomTypes {
    input_objects?: (InputObjectType | undefined)[]
    objects?: (ObjectType | undefined)[]
    scalars?: (ScalarType | undefined)[]
    enums?: (EnumType | undefined)[]
    __typename?: 'CustomTypes'
}

export interface InputObjectType {
    name: Scalars['String']
    fields: InputObjectField[]
    description?: Scalars['String']
    __typename?: 'InputObjectType'
}

export interface InputObjectField {
    name: Scalars['String']
    type: Scalars['String']
    description?: Scalars['String']
    __typename?: 'InputObjectField'
}

export interface ObjectType {
    name: Scalars['String']
    fields: ObjectField[]
    relationships?: (CustomTypeObjectRelationship | undefined)[]
    description?: Scalars['String']
    __typename?: 'ObjectType'
}

export interface ObjectField {
    name: Scalars['String']
    type: Scalars['String']
    description?: Scalars['String']
    __typename?: 'ObjectField'
}

export interface CustomTypeObjectRelationship {
    name: Scalars['String']
    type: Scalars['String']
    remote_table: QualifiedTable
    field_mapping: Scalars['JSONObject']
    __typename?: 'CustomTypeObjectRelationship'
}

export interface ScalarType {
    name: Scalars['String']
    description?: Scalars['String']
    __typename?: 'ScalarType'
}

export interface EnumType {
    name: Scalars['String']
    values: EnumValue[]
    description?: Scalars['String']
    __typename?: 'EnumType'
}

export interface EnumValue {
    value: Scalars['String']
    is_deprecated?: Scalars['Boolean']
    description?: Scalars['String']
    __typename?: 'EnumValue'
}

export interface CustomFunction {
    function: QualifiedFunction
    configuration?: FunctionConfiguration
    __typename?: 'CustomFunction'
}

export interface FunctionConfiguration {
    session_argument?: Scalars['String']
    __typename?: 'FunctionConfiguration'
}

export interface RemoteSchema {
    name: Scalars['String']
    definition: RemoteSchemaDef
    comment?: Scalars['String']
    __typename?: 'RemoteSchema'
}

export interface RemoteSchemaDef {
    url?: Scalars['String']
    url_from_env?: Scalars['String']
    headers?: (Header | undefined)[]
    forward_client_headers?: Scalars['Boolean']
    timeout_seconds?: Scalars['Int']
    __typename?: 'RemoteSchemaDef'
}

export interface QueryCollectionEntry {
    name: Scalars['String']
    definition: QueryCollectionDefinition
    comment?: Scalars['String']
    __typename?: 'QueryCollectionEntry'
}

export interface QueryCollectionDefinition {
    queries: QueryCollection[]
    __typename?: 'QueryCollectionDefinition'
}

export interface QueryCollection {
    name: Scalars['String']
    query: Scalars['String']
    __typename?: 'QueryCollection'
}

export interface AllowList {
    collection: Scalars['String']
    __typename?: 'AllowList'
}

export interface CronTrigger {
    name: Scalars['String']
    webhook: Scalars['String']
    schedule: Scalars['String']
    payload?: Scalars['JSONObject']
    headers: Header[]
    retry_conf?: RetryConfST
    include_in_metadata: Scalars['Boolean']
    comment?: Scalars['String']
    __typename?: 'CronTrigger'
}

export interface RetryConfST {
    num_retries?: Scalars['Int']
    retry_interval_seconds?: Scalars['Int']
    timeout_seconds?: Scalars['Int']
    tolerance_seconds?: Scalars['Int']
    __typename?: 'RetryConfST'
}

export type CacheControlScope = 'PUBLIC' | 'PRIVATE'

export interface QueryRequest{
    metadata?: HasuraMetadataRequest
    postgres?: PostgresRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresRequest{
    schemas?: SchemaRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SchemaRequest{
    name?: boolean | number
    tables?: PostgresTableRequest
    views?: PostgresViewRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BelongsToTableRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    on_PostgresColumn?: PostgresColumnRequest
    on_PostgresIndex?: PostgresIndexRequest
    on_PostgresPrimaryKey?: PostgresPrimaryKeyRequest
    on_PostgresForeignKey?: PostgresForeignKeyRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresViewRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    comment?: boolean | number
    columns?: PostgresColumnRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresTableRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    comment?: boolean | number
    columns?: PostgresColumnRequest
    primary_key?: PostgresPrimaryKeyRequest
    foreign_keys?: PostgresForeignKeyRequest
    indexes?: PostgresIndexRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresColumnRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    column_name?: boolean | number
    column_default?: boolean | number
    is_nullable?: boolean | number
    data_type?: boolean | number
    udt_name?: boolean | number
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresIndexRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    index_name?: boolean | number
    index_type?: boolean | number
    index_keys?: boolean | number
    is_unique?: boolean | number
    is_primary?: boolean | number
    is_partial?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresPrimaryKeyRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    constraint_name?: boolean | number
    columns?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostgresForeignKeyRequest{
    table_schema?: boolean | number
    table_name?: boolean | number
    constraint_name?: boolean | number
    ref_table_table_schema?: boolean | number
    ref_table?: boolean | number
    column_mapping?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HasuraMetadataRequest{
    version?: boolean | number
    tables?: TableEntryRequest
    actions?: ActionRequest
    custom_types?: CustomTypesRequest
    functions?: CustomFunctionRequest
    remote_schemas?: RemoteSchemaRequest
    query_collections?: QueryCollectionEntryRequest
    allowlist?: AllowListRequest
    cron_triggers?: CronTriggerRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TableEntryRequest{
    table?: QualifiedTableRequest
    is_enum?: boolean | number
    configuration?: TableConfigRequest
    event_triggers?: EventTriggerRequest
    computed_fields?: ComputedFieldRequest
    object_relationships?: ObjectRelationshipRequest
    array_relationships?: ArrayRelationshipRequest
    remote_relationships?: RemoteRelationshipRequest
    insert_permissions?: InsertPermissionEntryRequest
    select_permissions?: SelectPermissionEntryRequest
    update_permissions?: UpdatePermissionEntryRequest
    delete_permissions?: DeletePermissionEntryRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QualifiedTableRequest{
    name?: boolean | number
    schema?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ActionRequest{
    name?: boolean | number
    definition?: ActionDefinitionRequest
    comment?: boolean | number
    permissions?: ActionPermissionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ActionPermissionRequest{
    role?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ActionDefinitionRequest{
    arguments?: InputArgumentRequest
    output_type?: boolean | number
    kind?: boolean | number
    headers?: HeaderRequest
    forward_client_headers?: boolean | number
    handler?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InputArgumentRequest{
    name?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HeaderFromEnvRequest{
    name?: boolean | number
    value_from_env?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HeaderFromValueRequest{
    name?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HeaderRequest{on_HeaderFromEnv?:HeaderFromEnvRequest,on_HeaderFromValue?:HeaderFromValueRequest,__typename?:boolean | number}

export interface TableConfigRequest{
    custom_root_fields?: CustomRootFieldsRequest
    custom_column_names?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomRootFieldsRequest{
    select?: boolean | number
    select_by_pk?: boolean | number
    select_aggregate?: boolean | number
    insert?: boolean | number
    insert_one?: boolean | number
    update?: boolean | number
    update_by_pk?: boolean | number
    delete?: boolean | number
    delete_by_pk?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventTriggerRequest{
    name?: boolean | number
    definition?: EventTriggerDefinitionRequest
    retry_conf?: RetryConfRequest
    webhook?: boolean | number
    webhook_from_env?: boolean | number
    headers?: HeaderRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventTriggerDefinitionRequest{
    enable_manual?: boolean | number
    insert?: OperationSpecRequest
    delete?: OperationSpecRequest
    update?: OperationSpecRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OperationSpecRequest{on_OperationSpecAllColumns?:OperationSpecAllColumnsRequest,on_OperationSpecIndividualColumns?:OperationSpecIndividualColumnsRequest,__typename?:boolean | number}

export interface OperationSpecAllColumnsRequest{
    columns?: boolean | number
    payload?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OperationSpecIndividualColumnsRequest{
    columns?: boolean | number
    payload?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RetryConfRequest{
    num_retries?: boolean | number
    interval_sec?: boolean | number
    timeout_sec?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ComputedFieldRequest{
    name?: boolean | number
    definition?: ComputedFieldDefinitionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QualifiedFunctionRequest{
    name?: boolean | number
    schema?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ComputedFieldDefinitionRequest{
    function?: QualifiedFunctionRequest
    table_argument?: boolean | number
    session_argument?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ObjectRelationshipRequest{
    name?: boolean | number
    using?: ObjRelUsingRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ObjRelUsingRequest{
    foreign_key_constraint_on?: boolean | number
    manual_configuration?: ObjRelUsingManualMappingRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ObjRelUsingManualMappingRequest{
    remote_table?: QualifiedTableRequest
    column_mapping?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ArrayRelationshipRequest{
    name?: boolean | number
    using?: ArrRelUsingRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ArrRelUsingRequest{
    foreign_key_constraint_on?: ArrRelUsingFKeyOnRequest
    manual_configuration?: ArrRelUsingManualMappingRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ArrRelUsingFKeyOnRequest{
    column?: boolean | number
    table?: QualifiedTableRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ArrRelUsingManualMappingRequest{
    remote_table?: QualifiedTableRequest
    column_mapping?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RemoteRelationshipRequest{
    name?: boolean | number
    definition?: RemoteRelationshipDefRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RemoteRelationshipDefRequest{
    hasura_fields?: boolean | number
    remote_schema?: boolean | number
    remote_field?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InsertPermissionEntryRequest{
    role?: boolean | number
    permission?: InsertPermissionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InsertPermissionRequest{
    check?: boolean | number
    set?: boolean | number
    columns?: boolean | number
    backend_only?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SelectPermissionEntryRequest{
    role?: boolean | number
    permission?: SelectPermissionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SelectPermissionRequest{
    columns?: boolean | number
    computed_fields?: boolean | number
    limit?: boolean | number
    allow_aggregations?: boolean | number
    filter?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdatePermissionEntryRequest{
    role?: boolean | number
    permission?: UpdatePermissionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdatePermissionRequest{
    check?: boolean | number
    set?: boolean | number
    columns?: boolean | number
    filter?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeletePermissionEntryRequest{
    role?: boolean | number
    permission?: DeletePermissionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeletePermissionRequest{
    filter?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomTypesRequest{
    input_objects?: InputObjectTypeRequest
    objects?: ObjectTypeRequest
    scalars?: ScalarTypeRequest
    enums?: EnumTypeRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InputObjectTypeRequest{
    name?: boolean | number
    fields?: InputObjectFieldRequest
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface InputObjectFieldRequest{
    name?: boolean | number
    type?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ObjectTypeRequest{
    name?: boolean | number
    fields?: ObjectFieldRequest
    relationships?: CustomTypeObjectRelationshipRequest
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ObjectFieldRequest{
    name?: boolean | number
    type?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomTypeObjectRelationshipRequest{
    name?: boolean | number
    type?: boolean | number
    remote_table?: QualifiedTableRequest
    field_mapping?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ScalarTypeRequest{
    name?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnumTypeRequest{
    name?: boolean | number
    values?: EnumValueRequest
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnumValueRequest{
    value?: boolean | number
    is_deprecated?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomFunctionRequest{
    function?: QualifiedFunctionRequest
    configuration?: FunctionConfigurationRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FunctionConfigurationRequest{
    session_argument?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RemoteSchemaRequest{
    name?: boolean | number
    definition?: RemoteSchemaDefRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RemoteSchemaDefRequest{
    url?: boolean | number
    url_from_env?: boolean | number
    headers?: HeaderRequest
    forward_client_headers?: boolean | number
    timeout_seconds?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryCollectionEntryRequest{
    name?: boolean | number
    definition?: QueryCollectionDefinitionRequest
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryCollectionDefinitionRequest{
    queries?: QueryCollectionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryCollectionRequest{
    name?: boolean | number
    query?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AllowListRequest{
    collection?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CronTriggerRequest{
    name?: boolean | number
    webhook?: boolean | number
    schedule?: boolean | number
    payload?: boolean | number
    headers?: HeaderRequest
    retry_conf?: RetryConfSTRequest
    include_in_metadata?: boolean | number
    comment?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RetryConfSTRequest{
    num_retries?: boolean | number
    retry_interval_seconds?: boolean | number
    timeout_seconds?: boolean | number
    tolerance_seconds?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Postgres_possibleTypes = ['Postgres']
export const isPostgres = (obj?: { __typename?: any } | null): obj is Postgres => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgres"')
  return Postgres_possibleTypes.includes(obj.__typename)
}



const Schema_possibleTypes = ['Schema']
export const isSchema = (obj?: { __typename?: any } | null): obj is Schema => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSchema"')
  return Schema_possibleTypes.includes(obj.__typename)
}



const BelongsToTable_possibleTypes = ['PostgresColumn','PostgresIndex','PostgresPrimaryKey','PostgresForeignKey']
export const isBelongsToTable = (obj?: { __typename?: any } | null): obj is BelongsToTable => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBelongsToTable"')
  return BelongsToTable_possibleTypes.includes(obj.__typename)
}



const PostgresView_possibleTypes = ['PostgresView']
export const isPostgresView = (obj?: { __typename?: any } | null): obj is PostgresView => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresView"')
  return PostgresView_possibleTypes.includes(obj.__typename)
}



const PostgresTable_possibleTypes = ['PostgresTable']
export const isPostgresTable = (obj?: { __typename?: any } | null): obj is PostgresTable => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresTable"')
  return PostgresTable_possibleTypes.includes(obj.__typename)
}



const PostgresColumn_possibleTypes = ['PostgresColumn']
export const isPostgresColumn = (obj?: { __typename?: any } | null): obj is PostgresColumn => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresColumn"')
  return PostgresColumn_possibleTypes.includes(obj.__typename)
}



const PostgresIndex_possibleTypes = ['PostgresIndex']
export const isPostgresIndex = (obj?: { __typename?: any } | null): obj is PostgresIndex => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresIndex"')
  return PostgresIndex_possibleTypes.includes(obj.__typename)
}



const PostgresPrimaryKey_possibleTypes = ['PostgresPrimaryKey']
export const isPostgresPrimaryKey = (obj?: { __typename?: any } | null): obj is PostgresPrimaryKey => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresPrimaryKey"')
  return PostgresPrimaryKey_possibleTypes.includes(obj.__typename)
}



const PostgresForeignKey_possibleTypes = ['PostgresForeignKey']
export const isPostgresForeignKey = (obj?: { __typename?: any } | null): obj is PostgresForeignKey => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostgresForeignKey"')
  return PostgresForeignKey_possibleTypes.includes(obj.__typename)
}



const HasuraMetadata_possibleTypes = ['HasuraMetadata']
export const isHasuraMetadata = (obj?: { __typename?: any } | null): obj is HasuraMetadata => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHasuraMetadata"')
  return HasuraMetadata_possibleTypes.includes(obj.__typename)
}



const TableEntry_possibleTypes = ['TableEntry']
export const isTableEntry = (obj?: { __typename?: any } | null): obj is TableEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTableEntry"')
  return TableEntry_possibleTypes.includes(obj.__typename)
}



const QualifiedTable_possibleTypes = ['QualifiedTable']
export const isQualifiedTable = (obj?: { __typename?: any } | null): obj is QualifiedTable => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQualifiedTable"')
  return QualifiedTable_possibleTypes.includes(obj.__typename)
}



const Action_possibleTypes = ['Action']
export const isAction = (obj?: { __typename?: any } | null): obj is Action => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAction"')
  return Action_possibleTypes.includes(obj.__typename)
}



const ActionPermission_possibleTypes = ['ActionPermission']
export const isActionPermission = (obj?: { __typename?: any } | null): obj is ActionPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isActionPermission"')
  return ActionPermission_possibleTypes.includes(obj.__typename)
}



const ActionDefinition_possibleTypes = ['ActionDefinition']
export const isActionDefinition = (obj?: { __typename?: any } | null): obj is ActionDefinition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isActionDefinition"')
  return ActionDefinition_possibleTypes.includes(obj.__typename)
}



const InputArgument_possibleTypes = ['InputArgument']
export const isInputArgument = (obj?: { __typename?: any } | null): obj is InputArgument => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isInputArgument"')
  return InputArgument_possibleTypes.includes(obj.__typename)
}



const HeaderFromEnv_possibleTypes = ['HeaderFromEnv']
export const isHeaderFromEnv = (obj?: { __typename?: any } | null): obj is HeaderFromEnv => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHeaderFromEnv"')
  return HeaderFromEnv_possibleTypes.includes(obj.__typename)
}



const HeaderFromValue_possibleTypes = ['HeaderFromValue']
export const isHeaderFromValue = (obj?: { __typename?: any } | null): obj is HeaderFromValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHeaderFromValue"')
  return HeaderFromValue_possibleTypes.includes(obj.__typename)
}



const Header_possibleTypes = ['HeaderFromEnv','HeaderFromValue']
export const isHeader = (obj?: { __typename?: any } | null): obj is Header => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHeader"')
  return Header_possibleTypes.includes(obj.__typename)
}



const TableConfig_possibleTypes = ['TableConfig']
export const isTableConfig = (obj?: { __typename?: any } | null): obj is TableConfig => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTableConfig"')
  return TableConfig_possibleTypes.includes(obj.__typename)
}



const CustomRootFields_possibleTypes = ['CustomRootFields']
export const isCustomRootFields = (obj?: { __typename?: any } | null): obj is CustomRootFields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCustomRootFields"')
  return CustomRootFields_possibleTypes.includes(obj.__typename)
}



const EventTrigger_possibleTypes = ['EventTrigger']
export const isEventTrigger = (obj?: { __typename?: any } | null): obj is EventTrigger => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEventTrigger"')
  return EventTrigger_possibleTypes.includes(obj.__typename)
}



const EventTriggerDefinition_possibleTypes = ['EventTriggerDefinition']
export const isEventTriggerDefinition = (obj?: { __typename?: any } | null): obj is EventTriggerDefinition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEventTriggerDefinition"')
  return EventTriggerDefinition_possibleTypes.includes(obj.__typename)
}



const OperationSpec_possibleTypes = ['OperationSpecAllColumns','OperationSpecIndividualColumns']
export const isOperationSpec = (obj?: { __typename?: any } | null): obj is OperationSpec => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOperationSpec"')
  return OperationSpec_possibleTypes.includes(obj.__typename)
}



const OperationSpecAllColumns_possibleTypes = ['OperationSpecAllColumns']
export const isOperationSpecAllColumns = (obj?: { __typename?: any } | null): obj is OperationSpecAllColumns => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOperationSpecAllColumns"')
  return OperationSpecAllColumns_possibleTypes.includes(obj.__typename)
}



const OperationSpecIndividualColumns_possibleTypes = ['OperationSpecIndividualColumns']
export const isOperationSpecIndividualColumns = (obj?: { __typename?: any } | null): obj is OperationSpecIndividualColumns => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOperationSpecIndividualColumns"')
  return OperationSpecIndividualColumns_possibleTypes.includes(obj.__typename)
}



const RetryConf_possibleTypes = ['RetryConf']
export const isRetryConf = (obj?: { __typename?: any } | null): obj is RetryConf => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRetryConf"')
  return RetryConf_possibleTypes.includes(obj.__typename)
}



const ComputedField_possibleTypes = ['ComputedField']
export const isComputedField = (obj?: { __typename?: any } | null): obj is ComputedField => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComputedField"')
  return ComputedField_possibleTypes.includes(obj.__typename)
}



const QualifiedFunction_possibleTypes = ['QualifiedFunction']
export const isQualifiedFunction = (obj?: { __typename?: any } | null): obj is QualifiedFunction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQualifiedFunction"')
  return QualifiedFunction_possibleTypes.includes(obj.__typename)
}



const ComputedFieldDefinition_possibleTypes = ['ComputedFieldDefinition']
export const isComputedFieldDefinition = (obj?: { __typename?: any } | null): obj is ComputedFieldDefinition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComputedFieldDefinition"')
  return ComputedFieldDefinition_possibleTypes.includes(obj.__typename)
}



const ObjectRelationship_possibleTypes = ['ObjectRelationship']
export const isObjectRelationship = (obj?: { __typename?: any } | null): obj is ObjectRelationship => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isObjectRelationship"')
  return ObjectRelationship_possibleTypes.includes(obj.__typename)
}



const ObjRelUsing_possibleTypes = ['ObjRelUsing']
export const isObjRelUsing = (obj?: { __typename?: any } | null): obj is ObjRelUsing => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isObjRelUsing"')
  return ObjRelUsing_possibleTypes.includes(obj.__typename)
}



const ObjRelUsingManualMapping_possibleTypes = ['ObjRelUsingManualMapping']
export const isObjRelUsingManualMapping = (obj?: { __typename?: any } | null): obj is ObjRelUsingManualMapping => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isObjRelUsingManualMapping"')
  return ObjRelUsingManualMapping_possibleTypes.includes(obj.__typename)
}



const ArrayRelationship_possibleTypes = ['ArrayRelationship']
export const isArrayRelationship = (obj?: { __typename?: any } | null): obj is ArrayRelationship => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArrayRelationship"')
  return ArrayRelationship_possibleTypes.includes(obj.__typename)
}



const ArrRelUsing_possibleTypes = ['ArrRelUsing']
export const isArrRelUsing = (obj?: { __typename?: any } | null): obj is ArrRelUsing => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArrRelUsing"')
  return ArrRelUsing_possibleTypes.includes(obj.__typename)
}



const ArrRelUsingFKeyOn_possibleTypes = ['ArrRelUsingFKeyOn']
export const isArrRelUsingFKeyOn = (obj?: { __typename?: any } | null): obj is ArrRelUsingFKeyOn => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArrRelUsingFKeyOn"')
  return ArrRelUsingFKeyOn_possibleTypes.includes(obj.__typename)
}



const ArrRelUsingManualMapping_possibleTypes = ['ArrRelUsingManualMapping']
export const isArrRelUsingManualMapping = (obj?: { __typename?: any } | null): obj is ArrRelUsingManualMapping => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArrRelUsingManualMapping"')
  return ArrRelUsingManualMapping_possibleTypes.includes(obj.__typename)
}



const RemoteRelationship_possibleTypes = ['RemoteRelationship']
export const isRemoteRelationship = (obj?: { __typename?: any } | null): obj is RemoteRelationship => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRemoteRelationship"')
  return RemoteRelationship_possibleTypes.includes(obj.__typename)
}



const RemoteRelationshipDef_possibleTypes = ['RemoteRelationshipDef']
export const isRemoteRelationshipDef = (obj?: { __typename?: any } | null): obj is RemoteRelationshipDef => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRemoteRelationshipDef"')
  return RemoteRelationshipDef_possibleTypes.includes(obj.__typename)
}



const InsertPermissionEntry_possibleTypes = ['InsertPermissionEntry']
export const isInsertPermissionEntry = (obj?: { __typename?: any } | null): obj is InsertPermissionEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isInsertPermissionEntry"')
  return InsertPermissionEntry_possibleTypes.includes(obj.__typename)
}



const InsertPermission_possibleTypes = ['InsertPermission']
export const isInsertPermission = (obj?: { __typename?: any } | null): obj is InsertPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isInsertPermission"')
  return InsertPermission_possibleTypes.includes(obj.__typename)
}



const SelectPermissionEntry_possibleTypes = ['SelectPermissionEntry']
export const isSelectPermissionEntry = (obj?: { __typename?: any } | null): obj is SelectPermissionEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSelectPermissionEntry"')
  return SelectPermissionEntry_possibleTypes.includes(obj.__typename)
}



const SelectPermission_possibleTypes = ['SelectPermission']
export const isSelectPermission = (obj?: { __typename?: any } | null): obj is SelectPermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSelectPermission"')
  return SelectPermission_possibleTypes.includes(obj.__typename)
}



const UpdatePermissionEntry_possibleTypes = ['UpdatePermissionEntry']
export const isUpdatePermissionEntry = (obj?: { __typename?: any } | null): obj is UpdatePermissionEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUpdatePermissionEntry"')
  return UpdatePermissionEntry_possibleTypes.includes(obj.__typename)
}



const UpdatePermission_possibleTypes = ['UpdatePermission']
export const isUpdatePermission = (obj?: { __typename?: any } | null): obj is UpdatePermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUpdatePermission"')
  return UpdatePermission_possibleTypes.includes(obj.__typename)
}



const DeletePermissionEntry_possibleTypes = ['DeletePermissionEntry']
export const isDeletePermissionEntry = (obj?: { __typename?: any } | null): obj is DeletePermissionEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDeletePermissionEntry"')
  return DeletePermissionEntry_possibleTypes.includes(obj.__typename)
}



const DeletePermission_possibleTypes = ['DeletePermission']
export const isDeletePermission = (obj?: { __typename?: any } | null): obj is DeletePermission => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDeletePermission"')
  return DeletePermission_possibleTypes.includes(obj.__typename)
}



const CustomTypes_possibleTypes = ['CustomTypes']
export const isCustomTypes = (obj?: { __typename?: any } | null): obj is CustomTypes => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCustomTypes"')
  return CustomTypes_possibleTypes.includes(obj.__typename)
}



const InputObjectType_possibleTypes = ['InputObjectType']
export const isInputObjectType = (obj?: { __typename?: any } | null): obj is InputObjectType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isInputObjectType"')
  return InputObjectType_possibleTypes.includes(obj.__typename)
}



const InputObjectField_possibleTypes = ['InputObjectField']
export const isInputObjectField = (obj?: { __typename?: any } | null): obj is InputObjectField => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isInputObjectField"')
  return InputObjectField_possibleTypes.includes(obj.__typename)
}



const ObjectType_possibleTypes = ['ObjectType']
export const isObjectType = (obj?: { __typename?: any } | null): obj is ObjectType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isObjectType"')
  return ObjectType_possibleTypes.includes(obj.__typename)
}



const ObjectField_possibleTypes = ['ObjectField']
export const isObjectField = (obj?: { __typename?: any } | null): obj is ObjectField => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isObjectField"')
  return ObjectField_possibleTypes.includes(obj.__typename)
}



const CustomTypeObjectRelationship_possibleTypes = ['CustomTypeObjectRelationship']
export const isCustomTypeObjectRelationship = (obj?: { __typename?: any } | null): obj is CustomTypeObjectRelationship => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCustomTypeObjectRelationship"')
  return CustomTypeObjectRelationship_possibleTypes.includes(obj.__typename)
}



const ScalarType_possibleTypes = ['ScalarType']
export const isScalarType = (obj?: { __typename?: any } | null): obj is ScalarType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isScalarType"')
  return ScalarType_possibleTypes.includes(obj.__typename)
}



const EnumType_possibleTypes = ['EnumType']
export const isEnumType = (obj?: { __typename?: any } | null): obj is EnumType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEnumType"')
  return EnumType_possibleTypes.includes(obj.__typename)
}



const EnumValue_possibleTypes = ['EnumValue']
export const isEnumValue = (obj?: { __typename?: any } | null): obj is EnumValue => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isEnumValue"')
  return EnumValue_possibleTypes.includes(obj.__typename)
}



const CustomFunction_possibleTypes = ['CustomFunction']
export const isCustomFunction = (obj?: { __typename?: any } | null): obj is CustomFunction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCustomFunction"')
  return CustomFunction_possibleTypes.includes(obj.__typename)
}



const FunctionConfiguration_possibleTypes = ['FunctionConfiguration']
export const isFunctionConfiguration = (obj?: { __typename?: any } | null): obj is FunctionConfiguration => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFunctionConfiguration"')
  return FunctionConfiguration_possibleTypes.includes(obj.__typename)
}



const RemoteSchema_possibleTypes = ['RemoteSchema']
export const isRemoteSchema = (obj?: { __typename?: any } | null): obj is RemoteSchema => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRemoteSchema"')
  return RemoteSchema_possibleTypes.includes(obj.__typename)
}



const RemoteSchemaDef_possibleTypes = ['RemoteSchemaDef']
export const isRemoteSchemaDef = (obj?: { __typename?: any } | null): obj is RemoteSchemaDef => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRemoteSchemaDef"')
  return RemoteSchemaDef_possibleTypes.includes(obj.__typename)
}



const QueryCollectionEntry_possibleTypes = ['QueryCollectionEntry']
export const isQueryCollectionEntry = (obj?: { __typename?: any } | null): obj is QueryCollectionEntry => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQueryCollectionEntry"')
  return QueryCollectionEntry_possibleTypes.includes(obj.__typename)
}



const QueryCollectionDefinition_possibleTypes = ['QueryCollectionDefinition']
export const isQueryCollectionDefinition = (obj?: { __typename?: any } | null): obj is QueryCollectionDefinition => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQueryCollectionDefinition"')
  return QueryCollectionDefinition_possibleTypes.includes(obj.__typename)
}



const QueryCollection_possibleTypes = ['QueryCollection']
export const isQueryCollection = (obj?: { __typename?: any } | null): obj is QueryCollection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQueryCollection"')
  return QueryCollection_possibleTypes.includes(obj.__typename)
}



const AllowList_possibleTypes = ['AllowList']
export const isAllowList = (obj?: { __typename?: any } | null): obj is AllowList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAllowList"')
  return AllowList_possibleTypes.includes(obj.__typename)
}



const CronTrigger_possibleTypes = ['CronTrigger']
export const isCronTrigger = (obj?: { __typename?: any } | null): obj is CronTrigger => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCronTrigger"')
  return CronTrigger_possibleTypes.includes(obj.__typename)
}



const RetryConfST_possibleTypes = ['RetryConfST']
export const isRetryConfST = (obj?: { __typename?: any } | null): obj is RetryConfST => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRetryConfST"')
  return RetryConfST_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain{
    metadata: (HasuraMetadataPromiseChain & {get: <R extends HasuraMetadataRequest>(request: R, defaultValue?: (FieldsSelection<HasuraMetadata, R> | undefined)) => Promise<(FieldsSelection<HasuraMetadata, R> | undefined)>}),
    postgres: (PostgresPromiseChain & {get: <R extends PostgresRequest>(request: R, defaultValue?: (FieldsSelection<Postgres, R> | undefined)) => Promise<(FieldsSelection<Postgres, R> | undefined)>})
}

export interface QueryObservableChain{
    metadata: (HasuraMetadataObservableChain & {get: <R extends HasuraMetadataRequest>(request: R, defaultValue?: (FieldsSelection<HasuraMetadata, R> | undefined)) => Observable<(FieldsSelection<HasuraMetadata, R> | undefined)>}),
    postgres: (PostgresObservableChain & {get: <R extends PostgresRequest>(request: R, defaultValue?: (FieldsSelection<Postgres, R> | undefined)) => Observable<(FieldsSelection<Postgres, R> | undefined)>})
}

export interface PostgresPromiseChain{
    schemas: ({get: <R extends SchemaRequest>(request: R, defaultValue?: ((FieldsSelection<Schema, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Schema, R> | undefined)[] | undefined)>})
}

export interface PostgresObservableChain{
    schemas: ({get: <R extends SchemaRequest>(request: R, defaultValue?: ((FieldsSelection<Schema, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Schema, R> | undefined)[] | undefined)>})
}

export interface SchemaPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    tables: ({get: <R extends PostgresTableRequest>(request: R, defaultValue?: (FieldsSelection<PostgresTable, R>[] | undefined)) => Promise<(FieldsSelection<PostgresTable, R>[] | undefined)>}),
    views: ({get: <R extends PostgresViewRequest>(request: R, defaultValue?: (FieldsSelection<PostgresView, R>[] | undefined)) => Promise<(FieldsSelection<PostgresView, R>[] | undefined)>})
}

export interface SchemaObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    tables: ({get: <R extends PostgresTableRequest>(request: R, defaultValue?: (FieldsSelection<PostgresTable, R>[] | undefined)) => Observable<(FieldsSelection<PostgresTable, R>[] | undefined)>}),
    views: ({get: <R extends PostgresViewRequest>(request: R, defaultValue?: (FieldsSelection<PostgresView, R>[] | undefined)) => Observable<(FieldsSelection<PostgresView, R>[] | undefined)>})
}

export interface BelongsToTablePromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface BelongsToTableObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PostgresViewPromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    columns: ({get: <R extends PostgresColumnRequest>(request: R, defaultValue?: (FieldsSelection<PostgresColumn, R>[] | undefined)) => Promise<(FieldsSelection<PostgresColumn, R>[] | undefined)>})
}

export interface PostgresViewObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    columns: ({get: <R extends PostgresColumnRequest>(request: R, defaultValue?: (FieldsSelection<PostgresColumn, R>[] | undefined)) => Observable<(FieldsSelection<PostgresColumn, R>[] | undefined)>})
}

export interface PostgresTablePromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    columns: ({get: <R extends PostgresColumnRequest>(request: R, defaultValue?: (FieldsSelection<PostgresColumn, R>[] | undefined)) => Promise<(FieldsSelection<PostgresColumn, R>[] | undefined)>}),
    primary_key: (PostgresPrimaryKeyPromiseChain & {get: <R extends PostgresPrimaryKeyRequest>(request: R, defaultValue?: (FieldsSelection<PostgresPrimaryKey, R> | undefined)) => Promise<(FieldsSelection<PostgresPrimaryKey, R> | undefined)>}),
    foreign_keys: ({get: <R extends PostgresForeignKeyRequest>(request: R, defaultValue?: ((FieldsSelection<PostgresForeignKey, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PostgresForeignKey, R> | undefined)[] | undefined)>}),
    indexes: ({get: <R extends PostgresIndexRequest>(request: R, defaultValue?: ((FieldsSelection<PostgresIndex, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PostgresIndex, R> | undefined)[] | undefined)>})
}

export interface PostgresTableObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    columns: ({get: <R extends PostgresColumnRequest>(request: R, defaultValue?: (FieldsSelection<PostgresColumn, R>[] | undefined)) => Observable<(FieldsSelection<PostgresColumn, R>[] | undefined)>}),
    primary_key: (PostgresPrimaryKeyObservableChain & {get: <R extends PostgresPrimaryKeyRequest>(request: R, defaultValue?: (FieldsSelection<PostgresPrimaryKey, R> | undefined)) => Observable<(FieldsSelection<PostgresPrimaryKey, R> | undefined)>}),
    foreign_keys: ({get: <R extends PostgresForeignKeyRequest>(request: R, defaultValue?: ((FieldsSelection<PostgresForeignKey, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PostgresForeignKey, R> | undefined)[] | undefined)>}),
    indexes: ({get: <R extends PostgresIndexRequest>(request: R, defaultValue?: ((FieldsSelection<PostgresIndex, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PostgresIndex, R> | undefined)[] | undefined)>})
}

export interface PostgresColumnPromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    column_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    column_default: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    is_nullable: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    data_type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    udt_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface PostgresColumnObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    column_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    column_default: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    is_nullable: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    data_type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    udt_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface PostgresIndexPromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    index_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    index_type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    index_keys: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    is_unique: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    is_primary: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    is_partial: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PostgresIndexObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    index_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    index_type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    index_keys: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    is_unique: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    is_primary: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    is_partial: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PostgresPrimaryKeyPromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    constraint_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>})
}

export interface PostgresPrimaryKeyObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    constraint_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>})
}

export interface PostgresForeignKeyPromiseChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    constraint_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    ref_table_table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    ref_table: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Promise<Scalars['JSONObject']>})
}

export interface PostgresForeignKeyObservableChain{
    table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    constraint_name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    ref_table_table_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    ref_table: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Observable<Scalars['JSONObject']>})
}

export interface HasuraMetadataPromiseChain{
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    tables: ({get: <R extends TableEntryRequest>(request: R, defaultValue?: ((FieldsSelection<TableEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TableEntry, R> | undefined)[] | undefined)>}),
    actions: ({get: <R extends ActionRequest>(request: R, defaultValue?: ((FieldsSelection<Action, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Action, R> | undefined)[] | undefined)>}),
    custom_types: (CustomTypesPromiseChain & {get: <R extends CustomTypesRequest>(request: R, defaultValue?: (FieldsSelection<CustomTypes, R> | undefined)) => Promise<(FieldsSelection<CustomTypes, R> | undefined)>}),
    functions: ({get: <R extends CustomFunctionRequest>(request: R, defaultValue?: ((FieldsSelection<CustomFunction, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<CustomFunction, R> | undefined)[] | undefined)>}),
    remote_schemas: ({get: <R extends RemoteSchemaRequest>(request: R, defaultValue?: ((FieldsSelection<RemoteSchema, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<RemoteSchema, R> | undefined)[] | undefined)>}),
    query_collections: ({get: <R extends QueryCollectionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<QueryCollectionEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<QueryCollectionEntry, R> | undefined)[] | undefined)>}),
    allowlist: ({get: <R extends AllowListRequest>(request: R, defaultValue?: ((FieldsSelection<AllowList, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<AllowList, R> | undefined)[] | undefined)>}),
    cron_triggers: ({get: <R extends CronTriggerRequest>(request: R, defaultValue?: ((FieldsSelection<CronTrigger, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<CronTrigger, R> | undefined)[] | undefined)>})
}

export interface HasuraMetadataObservableChain{
    version: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    tables: ({get: <R extends TableEntryRequest>(request: R, defaultValue?: ((FieldsSelection<TableEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TableEntry, R> | undefined)[] | undefined)>}),
    actions: ({get: <R extends ActionRequest>(request: R, defaultValue?: ((FieldsSelection<Action, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Action, R> | undefined)[] | undefined)>}),
    custom_types: (CustomTypesObservableChain & {get: <R extends CustomTypesRequest>(request: R, defaultValue?: (FieldsSelection<CustomTypes, R> | undefined)) => Observable<(FieldsSelection<CustomTypes, R> | undefined)>}),
    functions: ({get: <R extends CustomFunctionRequest>(request: R, defaultValue?: ((FieldsSelection<CustomFunction, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<CustomFunction, R> | undefined)[] | undefined)>}),
    remote_schemas: ({get: <R extends RemoteSchemaRequest>(request: R, defaultValue?: ((FieldsSelection<RemoteSchema, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<RemoteSchema, R> | undefined)[] | undefined)>}),
    query_collections: ({get: <R extends QueryCollectionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<QueryCollectionEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<QueryCollectionEntry, R> | undefined)[] | undefined)>}),
    allowlist: ({get: <R extends AllowListRequest>(request: R, defaultValue?: ((FieldsSelection<AllowList, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<AllowList, R> | undefined)[] | undefined)>}),
    cron_triggers: ({get: <R extends CronTriggerRequest>(request: R, defaultValue?: ((FieldsSelection<CronTrigger, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<CronTrigger, R> | undefined)[] | undefined)>})
}

export interface TableEntryPromiseChain{
    table: (QualifiedTablePromiseChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: (FieldsSelection<QualifiedTable, R> | undefined)) => Promise<(FieldsSelection<QualifiedTable, R> | undefined)>}),
    is_enum: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    configuration: (TableConfigPromiseChain & {get: <R extends TableConfigRequest>(request: R, defaultValue?: (FieldsSelection<TableConfig, R> | undefined)) => Promise<(FieldsSelection<TableConfig, R> | undefined)>}),
    event_triggers: ({get: <R extends EventTriggerRequest>(request: R, defaultValue?: ((FieldsSelection<EventTrigger, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<EventTrigger, R> | undefined)[] | undefined)>}),
    computed_fields: ({get: <R extends ComputedFieldRequest>(request: R, defaultValue?: ((FieldsSelection<ComputedField, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ComputedField, R> | undefined)[] | undefined)>}),
    object_relationships: ({get: <R extends ObjectRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<ObjectRelationship, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ObjectRelationship, R> | undefined)[] | undefined)>}),
    array_relationships: ({get: <R extends ArrayRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<ArrayRelationship, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ArrayRelationship, R> | undefined)[] | undefined)>}),
    remote_relationships: ({get: <R extends RemoteRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<RemoteRelationship, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<RemoteRelationship, R> | undefined)[] | undefined)>}),
    insert_permissions: ({get: <R extends InsertPermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<InsertPermissionEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<InsertPermissionEntry, R> | undefined)[] | undefined)>}),
    select_permissions: ({get: <R extends SelectPermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<SelectPermissionEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<SelectPermissionEntry, R> | undefined)[] | undefined)>}),
    update_permissions: ({get: <R extends UpdatePermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<UpdatePermissionEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<UpdatePermissionEntry, R> | undefined)[] | undefined)>}),
    delete_permissions: ({get: <R extends DeletePermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<DeletePermissionEntry, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<DeletePermissionEntry, R> | undefined)[] | undefined)>})
}

export interface TableEntryObservableChain{
    table: (QualifiedTableObservableChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: (FieldsSelection<QualifiedTable, R> | undefined)) => Observable<(FieldsSelection<QualifiedTable, R> | undefined)>}),
    is_enum: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    configuration: (TableConfigObservableChain & {get: <R extends TableConfigRequest>(request: R, defaultValue?: (FieldsSelection<TableConfig, R> | undefined)) => Observable<(FieldsSelection<TableConfig, R> | undefined)>}),
    event_triggers: ({get: <R extends EventTriggerRequest>(request: R, defaultValue?: ((FieldsSelection<EventTrigger, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<EventTrigger, R> | undefined)[] | undefined)>}),
    computed_fields: ({get: <R extends ComputedFieldRequest>(request: R, defaultValue?: ((FieldsSelection<ComputedField, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ComputedField, R> | undefined)[] | undefined)>}),
    object_relationships: ({get: <R extends ObjectRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<ObjectRelationship, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ObjectRelationship, R> | undefined)[] | undefined)>}),
    array_relationships: ({get: <R extends ArrayRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<ArrayRelationship, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ArrayRelationship, R> | undefined)[] | undefined)>}),
    remote_relationships: ({get: <R extends RemoteRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<RemoteRelationship, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<RemoteRelationship, R> | undefined)[] | undefined)>}),
    insert_permissions: ({get: <R extends InsertPermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<InsertPermissionEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<InsertPermissionEntry, R> | undefined)[] | undefined)>}),
    select_permissions: ({get: <R extends SelectPermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<SelectPermissionEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<SelectPermissionEntry, R> | undefined)[] | undefined)>}),
    update_permissions: ({get: <R extends UpdatePermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<UpdatePermissionEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<UpdatePermissionEntry, R> | undefined)[] | undefined)>}),
    delete_permissions: ({get: <R extends DeletePermissionEntryRequest>(request: R, defaultValue?: ((FieldsSelection<DeletePermissionEntry, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<DeletePermissionEntry, R> | undefined)[] | undefined)>})
}

export interface QualifiedTablePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface QualifiedTableObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface ActionPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (ActionDefinitionPromiseChain & {get: <R extends ActionDefinitionRequest>(request: R, defaultValue?: FieldsSelection<ActionDefinition, R>) => Promise<FieldsSelection<ActionDefinition, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    permissions: ({get: <R extends ActionPermissionRequest>(request: R, defaultValue?: ((FieldsSelection<ActionPermission, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ActionPermission, R> | undefined)[] | undefined)>})
}

export interface ActionObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (ActionDefinitionObservableChain & {get: <R extends ActionDefinitionRequest>(request: R, defaultValue?: FieldsSelection<ActionDefinition, R>) => Observable<FieldsSelection<ActionDefinition, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    permissions: ({get: <R extends ActionPermissionRequest>(request: R, defaultValue?: ((FieldsSelection<ActionPermission, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ActionPermission, R> | undefined)[] | undefined)>})
}

export interface ActionPermissionPromiseChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ActionPermissionObservableChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface ActionDefinitionPromiseChain{
    arguments: ({get: <R extends InputArgumentRequest>(request: R, defaultValue?: ((FieldsSelection<InputArgument, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<InputArgument, R> | undefined)[] | undefined)>}),
    output_type: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    kind: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Header, R> | undefined)[] | undefined)>}),
    forward_client_headers: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    handler: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ActionDefinitionObservableChain{
    arguments: ({get: <R extends InputArgumentRequest>(request: R, defaultValue?: ((FieldsSelection<InputArgument, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<InputArgument, R> | undefined)[] | undefined)>}),
    output_type: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    kind: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Header, R> | undefined)[] | undefined)>}),
    forward_client_headers: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    handler: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface InputArgumentPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface InputArgumentObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface HeaderFromEnvPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    value_from_env: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface HeaderFromEnvObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    value_from_env: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface HeaderFromValuePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    value: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface HeaderFromValueObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    value: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface TableConfigPromiseChain{
    custom_root_fields: (CustomRootFieldsPromiseChain & {get: <R extends CustomRootFieldsRequest>(request: R, defaultValue?: (FieldsSelection<CustomRootFields, R> | undefined)) => Promise<(FieldsSelection<CustomRootFields, R> | undefined)>}),
    custom_column_names: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>})
}

export interface TableConfigObservableChain{
    custom_root_fields: (CustomRootFieldsObservableChain & {get: <R extends CustomRootFieldsRequest>(request: R, defaultValue?: (FieldsSelection<CustomRootFields, R> | undefined)) => Observable<(FieldsSelection<CustomRootFields, R> | undefined)>}),
    custom_column_names: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>})
}

export interface CustomRootFieldsPromiseChain{
    select: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    select_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    select_aggregate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    insert: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    insert_one: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    update: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    update_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    delete: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    delete_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface CustomRootFieldsObservableChain{
    select: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    select_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    select_aggregate: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    insert: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    insert_one: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    update: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    update_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    delete: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    delete_by_pk: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface EventTriggerPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (EventTriggerDefinitionPromiseChain & {get: <R extends EventTriggerDefinitionRequest>(request: R, defaultValue?: (FieldsSelection<EventTriggerDefinition, R> | undefined)) => Promise<(FieldsSelection<EventTriggerDefinition, R> | undefined)>}),
    retry_conf: (RetryConfPromiseChain & {get: <R extends RetryConfRequest>(request: R, defaultValue?: (FieldsSelection<RetryConf, R> | undefined)) => Promise<(FieldsSelection<RetryConf, R> | undefined)>}),
    webhook: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    webhook_from_env: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Header, R> | undefined)[] | undefined)>})
}

export interface EventTriggerObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (EventTriggerDefinitionObservableChain & {get: <R extends EventTriggerDefinitionRequest>(request: R, defaultValue?: (FieldsSelection<EventTriggerDefinition, R> | undefined)) => Observable<(FieldsSelection<EventTriggerDefinition, R> | undefined)>}),
    retry_conf: (RetryConfObservableChain & {get: <R extends RetryConfRequest>(request: R, defaultValue?: (FieldsSelection<RetryConf, R> | undefined)) => Observable<(FieldsSelection<RetryConf, R> | undefined)>}),
    webhook: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    webhook_from_env: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Header, R> | undefined)[] | undefined)>})
}

export interface EventTriggerDefinitionPromiseChain{
    enable_manual: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    insert: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Promise<(FieldsSelection<OperationSpec, R> | undefined)>}),
    delete: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Promise<(FieldsSelection<OperationSpec, R> | undefined)>}),
    update: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Promise<(FieldsSelection<OperationSpec, R> | undefined)>})
}

export interface EventTriggerDefinitionObservableChain{
    enable_manual: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    insert: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Observable<(FieldsSelection<OperationSpec, R> | undefined)>}),
    delete: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Observable<(FieldsSelection<OperationSpec, R> | undefined)>}),
    update: ({get: <R extends OperationSpecRequest>(request: R, defaultValue?: (FieldsSelection<OperationSpec, R> | undefined)) => Observable<(FieldsSelection<OperationSpec, R> | undefined)>})
}

export interface OperationSpecAllColumnsPromiseChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Promise<(Scalars['String'][] | undefined)>})
}

export interface OperationSpecAllColumnsObservableChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Observable<(Scalars['String'][] | undefined)>})
}

export interface OperationSpecIndividualColumnsPromiseChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Promise<(Scalars['String'][] | undefined)>})
}

export interface OperationSpecIndividualColumnsObservableChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Observable<(Scalars['String'][] | undefined)>})
}

export interface RetryConfPromiseChain{
    num_retries: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    interval_sec: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    timeout_sec: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface RetryConfObservableChain{
    num_retries: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    interval_sec: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    timeout_sec: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface ComputedFieldPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (ComputedFieldDefinitionPromiseChain & {get: <R extends ComputedFieldDefinitionRequest>(request: R, defaultValue?: (FieldsSelection<ComputedFieldDefinition, R> | undefined)) => Promise<(FieldsSelection<ComputedFieldDefinition, R> | undefined)>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ComputedFieldObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (ComputedFieldDefinitionObservableChain & {get: <R extends ComputedFieldDefinitionRequest>(request: R, defaultValue?: (FieldsSelection<ComputedFieldDefinition, R> | undefined)) => Observable<(FieldsSelection<ComputedFieldDefinition, R> | undefined)>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface QualifiedFunctionPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface QualifiedFunctionObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface ComputedFieldDefinitionPromiseChain{
    function: (QualifiedFunctionPromiseChain & {get: <R extends QualifiedFunctionRequest>(request: R, defaultValue?: FieldsSelection<QualifiedFunction, R>) => Promise<FieldsSelection<QualifiedFunction, R>>}),
    table_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    session_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ComputedFieldDefinitionObservableChain{
    function: (QualifiedFunctionObservableChain & {get: <R extends QualifiedFunctionRequest>(request: R, defaultValue?: FieldsSelection<QualifiedFunction, R>) => Observable<FieldsSelection<QualifiedFunction, R>>}),
    table_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    session_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ObjectRelationshipPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    using: (ObjRelUsingPromiseChain & {get: <R extends ObjRelUsingRequest>(request: R, defaultValue?: FieldsSelection<ObjRelUsing, R>) => Promise<FieldsSelection<ObjRelUsing, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ObjectRelationshipObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    using: (ObjRelUsingObservableChain & {get: <R extends ObjRelUsingRequest>(request: R, defaultValue?: FieldsSelection<ObjRelUsing, R>) => Observable<FieldsSelection<ObjRelUsing, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ObjRelUsingPromiseChain{
    foreign_key_constraint_on: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    manual_configuration: (ObjRelUsingManualMappingPromiseChain & {get: <R extends ObjRelUsingManualMappingRequest>(request: R, defaultValue?: (FieldsSelection<ObjRelUsingManualMapping, R> | undefined)) => Promise<(FieldsSelection<ObjRelUsingManualMapping, R> | undefined)>})
}

export interface ObjRelUsingObservableChain{
    foreign_key_constraint_on: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    manual_configuration: (ObjRelUsingManualMappingObservableChain & {get: <R extends ObjRelUsingManualMappingRequest>(request: R, defaultValue?: (FieldsSelection<ObjRelUsingManualMapping, R> | undefined)) => Observable<(FieldsSelection<ObjRelUsingManualMapping, R> | undefined)>})
}

export interface ObjRelUsingManualMappingPromiseChain{
    remote_table: (QualifiedTablePromiseChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Promise<FieldsSelection<QualifiedTable, R>>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Promise<Scalars['JSONObject']>})
}

export interface ObjRelUsingManualMappingObservableChain{
    remote_table: (QualifiedTableObservableChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Observable<FieldsSelection<QualifiedTable, R>>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Observable<Scalars['JSONObject']>})
}

export interface ArrayRelationshipPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    using: (ArrRelUsingPromiseChain & {get: <R extends ArrRelUsingRequest>(request: R, defaultValue?: FieldsSelection<ArrRelUsing, R>) => Promise<FieldsSelection<ArrRelUsing, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ArrayRelationshipObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    using: (ArrRelUsingObservableChain & {get: <R extends ArrRelUsingRequest>(request: R, defaultValue?: FieldsSelection<ArrRelUsing, R>) => Observable<FieldsSelection<ArrRelUsing, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ArrRelUsingPromiseChain{
    foreign_key_constraint_on: (ArrRelUsingFKeyOnPromiseChain & {get: <R extends ArrRelUsingFKeyOnRequest>(request: R, defaultValue?: (FieldsSelection<ArrRelUsingFKeyOn, R> | undefined)) => Promise<(FieldsSelection<ArrRelUsingFKeyOn, R> | undefined)>}),
    manual_configuration: (ArrRelUsingManualMappingPromiseChain & {get: <R extends ArrRelUsingManualMappingRequest>(request: R, defaultValue?: (FieldsSelection<ArrRelUsingManualMapping, R> | undefined)) => Promise<(FieldsSelection<ArrRelUsingManualMapping, R> | undefined)>})
}

export interface ArrRelUsingObservableChain{
    foreign_key_constraint_on: (ArrRelUsingFKeyOnObservableChain & {get: <R extends ArrRelUsingFKeyOnRequest>(request: R, defaultValue?: (FieldsSelection<ArrRelUsingFKeyOn, R> | undefined)) => Observable<(FieldsSelection<ArrRelUsingFKeyOn, R> | undefined)>}),
    manual_configuration: (ArrRelUsingManualMappingObservableChain & {get: <R extends ArrRelUsingManualMappingRequest>(request: R, defaultValue?: (FieldsSelection<ArrRelUsingManualMapping, R> | undefined)) => Observable<(FieldsSelection<ArrRelUsingManualMapping, R> | undefined)>})
}

export interface ArrRelUsingFKeyOnPromiseChain{
    column: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    table: (QualifiedTablePromiseChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Promise<FieldsSelection<QualifiedTable, R>>})
}

export interface ArrRelUsingFKeyOnObservableChain{
    column: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    table: (QualifiedTableObservableChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Observable<FieldsSelection<QualifiedTable, R>>})
}

export interface ArrRelUsingManualMappingPromiseChain{
    remote_table: (QualifiedTablePromiseChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Promise<FieldsSelection<QualifiedTable, R>>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Promise<Scalars['JSONObject']>})
}

export interface ArrRelUsingManualMappingObservableChain{
    remote_table: (QualifiedTableObservableChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Observable<FieldsSelection<QualifiedTable, R>>}),
    column_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Observable<Scalars['JSONObject']>})
}

export interface RemoteRelationshipPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (RemoteRelationshipDefPromiseChain & {get: <R extends RemoteRelationshipDefRequest>(request: R, defaultValue?: (FieldsSelection<RemoteRelationshipDef, R> | undefined)) => Promise<(FieldsSelection<RemoteRelationshipDef, R> | undefined)>})
}

export interface RemoteRelationshipObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (RemoteRelationshipDefObservableChain & {get: <R extends RemoteRelationshipDefRequest>(request: R, defaultValue?: (FieldsSelection<RemoteRelationshipDef, R> | undefined)) => Observable<(FieldsSelection<RemoteRelationshipDef, R> | undefined)>})
}

export interface RemoteRelationshipDefPromiseChain{
    hasura_fields: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    remote_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    remote_field: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>})
}

export interface RemoteRelationshipDefObservableChain{
    hasura_fields: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    remote_schema: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    remote_field: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>})
}

export interface InsertPermissionEntryPromiseChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permission: (InsertPermissionPromiseChain & {get: <R extends InsertPermissionRequest>(request: R, defaultValue?: FieldsSelection<InsertPermission, R>) => Promise<FieldsSelection<InsertPermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface InsertPermissionEntryObservableChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permission: (InsertPermissionObservableChain & {get: <R extends InsertPermissionRequest>(request: R, defaultValue?: FieldsSelection<InsertPermission, R>) => Observable<FieldsSelection<InsertPermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface InsertPermissionPromiseChain{
    check: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>}),
    set: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    backend_only: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface InsertPermissionObservableChain{
    check: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>}),
    set: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    backend_only: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface SelectPermissionEntryPromiseChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permission: (SelectPermissionPromiseChain & {get: <R extends SelectPermissionRequest>(request: R, defaultValue?: FieldsSelection<SelectPermission, R>) => Promise<FieldsSelection<SelectPermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface SelectPermissionEntryObservableChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permission: (SelectPermissionObservableChain & {get: <R extends SelectPermissionRequest>(request: R, defaultValue?: FieldsSelection<SelectPermission, R>) => Observable<FieldsSelection<SelectPermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface SelectPermissionPromiseChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    computed_fields: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Promise<((Scalars['String'] | undefined)[] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    allow_aggregations: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>})
}

export interface SelectPermissionObservableChain{
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    computed_fields: ({get: (request?: boolean|number, defaultValue?: ((Scalars['String'] | undefined)[] | undefined)) => Observable<((Scalars['String'] | undefined)[] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    allow_aggregations: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>})
}

export interface UpdatePermissionEntryPromiseChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permission: (UpdatePermissionPromiseChain & {get: <R extends UpdatePermissionRequest>(request: R, defaultValue?: FieldsSelection<UpdatePermission, R>) => Promise<FieldsSelection<UpdatePermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface UpdatePermissionEntryObservableChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permission: (UpdatePermissionObservableChain & {get: <R extends UpdatePermissionRequest>(request: R, defaultValue?: FieldsSelection<UpdatePermission, R>) => Observable<FieldsSelection<UpdatePermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface UpdatePermissionPromiseChain{
    check: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>}),
    set: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Promise<Scalars['String'][]>}),
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>})
}

export interface UpdatePermissionObservableChain{
    check: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>}),
    set: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>}),
    columns: ({get: (request?: boolean|number, defaultValue?: Scalars['String'][]) => Observable<Scalars['String'][]>}),
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>})
}

export interface DeletePermissionEntryPromiseChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    permission: (DeletePermissionPromiseChain & {get: <R extends DeletePermissionRequest>(request: R, defaultValue?: FieldsSelection<DeletePermission, R>) => Promise<FieldsSelection<DeletePermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface DeletePermissionEntryObservableChain{
    role: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    permission: (DeletePermissionObservableChain & {get: <R extends DeletePermissionRequest>(request: R, defaultValue?: FieldsSelection<DeletePermission, R>) => Observable<FieldsSelection<DeletePermission, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface DeletePermissionPromiseChain{
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>})
}

export interface DeletePermissionObservableChain{
    filter: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>})
}

export interface CustomTypesPromiseChain{
    input_objects: ({get: <R extends InputObjectTypeRequest>(request: R, defaultValue?: ((FieldsSelection<InputObjectType, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<InputObjectType, R> | undefined)[] | undefined)>}),
    objects: ({get: <R extends ObjectTypeRequest>(request: R, defaultValue?: ((FieldsSelection<ObjectType, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ObjectType, R> | undefined)[] | undefined)>}),
    scalars: ({get: <R extends ScalarTypeRequest>(request: R, defaultValue?: ((FieldsSelection<ScalarType, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ScalarType, R> | undefined)[] | undefined)>}),
    enums: ({get: <R extends EnumTypeRequest>(request: R, defaultValue?: ((FieldsSelection<EnumType, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<EnumType, R> | undefined)[] | undefined)>})
}

export interface CustomTypesObservableChain{
    input_objects: ({get: <R extends InputObjectTypeRequest>(request: R, defaultValue?: ((FieldsSelection<InputObjectType, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<InputObjectType, R> | undefined)[] | undefined)>}),
    objects: ({get: <R extends ObjectTypeRequest>(request: R, defaultValue?: ((FieldsSelection<ObjectType, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ObjectType, R> | undefined)[] | undefined)>}),
    scalars: ({get: <R extends ScalarTypeRequest>(request: R, defaultValue?: ((FieldsSelection<ScalarType, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ScalarType, R> | undefined)[] | undefined)>}),
    enums: ({get: <R extends EnumTypeRequest>(request: R, defaultValue?: ((FieldsSelection<EnumType, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<EnumType, R> | undefined)[] | undefined)>})
}

export interface InputObjectTypePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    fields: ({get: <R extends InputObjectFieldRequest>(request: R, defaultValue?: FieldsSelection<InputObjectField, R>[]) => Promise<FieldsSelection<InputObjectField, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface InputObjectTypeObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    fields: ({get: <R extends InputObjectFieldRequest>(request: R, defaultValue?: FieldsSelection<InputObjectField, R>[]) => Observable<FieldsSelection<InputObjectField, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface InputObjectFieldPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface InputObjectFieldObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ObjectTypePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    fields: ({get: <R extends ObjectFieldRequest>(request: R, defaultValue?: FieldsSelection<ObjectField, R>[]) => Promise<FieldsSelection<ObjectField, R>[]>}),
    relationships: ({get: <R extends CustomTypeObjectRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<CustomTypeObjectRelationship, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<CustomTypeObjectRelationship, R> | undefined)[] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ObjectTypeObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    fields: ({get: <R extends ObjectFieldRequest>(request: R, defaultValue?: FieldsSelection<ObjectField, R>[]) => Observable<FieldsSelection<ObjectField, R>[]>}),
    relationships: ({get: <R extends CustomTypeObjectRelationshipRequest>(request: R, defaultValue?: ((FieldsSelection<CustomTypeObjectRelationship, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<CustomTypeObjectRelationship, R> | undefined)[] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface ObjectFieldPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ObjectFieldObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface CustomTypeObjectRelationshipPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    remote_table: (QualifiedTablePromiseChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Promise<FieldsSelection<QualifiedTable, R>>}),
    field_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Promise<Scalars['JSONObject']>})
}

export interface CustomTypeObjectRelationshipObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    remote_table: (QualifiedTableObservableChain & {get: <R extends QualifiedTableRequest>(request: R, defaultValue?: FieldsSelection<QualifiedTable, R>) => Observable<FieldsSelection<QualifiedTable, R>>}),
    field_mapping: ({get: (request?: boolean|number, defaultValue?: Scalars['JSONObject']) => Observable<Scalars['JSONObject']>})
}

export interface ScalarTypePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ScalarTypeObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface EnumTypePromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    values: ({get: <R extends EnumValueRequest>(request: R, defaultValue?: FieldsSelection<EnumValue, R>[]) => Promise<FieldsSelection<EnumValue, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface EnumTypeObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    values: ({get: <R extends EnumValueRequest>(request: R, defaultValue?: FieldsSelection<EnumValue, R>[]) => Observable<FieldsSelection<EnumValue, R>[]>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface EnumValuePromiseChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    is_deprecated: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface EnumValueObservableChain{
    value: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    is_deprecated: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface CustomFunctionPromiseChain{
    function: (QualifiedFunctionPromiseChain & {get: <R extends QualifiedFunctionRequest>(request: R, defaultValue?: FieldsSelection<QualifiedFunction, R>) => Promise<FieldsSelection<QualifiedFunction, R>>}),
    configuration: (FunctionConfigurationPromiseChain & {get: <R extends FunctionConfigurationRequest>(request: R, defaultValue?: (FieldsSelection<FunctionConfiguration, R> | undefined)) => Promise<(FieldsSelection<FunctionConfiguration, R> | undefined)>})
}

export interface CustomFunctionObservableChain{
    function: (QualifiedFunctionObservableChain & {get: <R extends QualifiedFunctionRequest>(request: R, defaultValue?: FieldsSelection<QualifiedFunction, R>) => Observable<FieldsSelection<QualifiedFunction, R>>}),
    configuration: (FunctionConfigurationObservableChain & {get: <R extends FunctionConfigurationRequest>(request: R, defaultValue?: (FieldsSelection<FunctionConfiguration, R> | undefined)) => Observable<(FieldsSelection<FunctionConfiguration, R> | undefined)>})
}

export interface FunctionConfigurationPromiseChain{
    session_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface FunctionConfigurationObservableChain{
    session_argument: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface RemoteSchemaPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (RemoteSchemaDefPromiseChain & {get: <R extends RemoteSchemaDefRequest>(request: R, defaultValue?: FieldsSelection<RemoteSchemaDef, R>) => Promise<FieldsSelection<RemoteSchemaDef, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface RemoteSchemaObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (RemoteSchemaDefObservableChain & {get: <R extends RemoteSchemaDefRequest>(request: R, defaultValue?: FieldsSelection<RemoteSchemaDef, R>) => Observable<FieldsSelection<RemoteSchemaDef, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface RemoteSchemaDefPromiseChain{
    url: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    url_from_env: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Header, R> | undefined)[] | undefined)>}),
    forward_client_headers: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    timeout_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface RemoteSchemaDefObservableChain{
    url: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    url_from_env: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: ((FieldsSelection<Header, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Header, R> | undefined)[] | undefined)>}),
    forward_client_headers: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    timeout_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface QueryCollectionEntryPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    definition: (QueryCollectionDefinitionPromiseChain & {get: <R extends QueryCollectionDefinitionRequest>(request: R, defaultValue?: FieldsSelection<QueryCollectionDefinition, R>) => Promise<FieldsSelection<QueryCollectionDefinition, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface QueryCollectionEntryObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    definition: (QueryCollectionDefinitionObservableChain & {get: <R extends QueryCollectionDefinitionRequest>(request: R, defaultValue?: FieldsSelection<QueryCollectionDefinition, R>) => Observable<FieldsSelection<QueryCollectionDefinition, R>>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface QueryCollectionDefinitionPromiseChain{
    queries: ({get: <R extends QueryCollectionRequest>(request: R, defaultValue?: FieldsSelection<QueryCollection, R>[]) => Promise<FieldsSelection<QueryCollection, R>[]>})
}

export interface QueryCollectionDefinitionObservableChain{
    queries: ({get: <R extends QueryCollectionRequest>(request: R, defaultValue?: FieldsSelection<QueryCollection, R>[]) => Observable<FieldsSelection<QueryCollection, R>[]>})
}

export interface QueryCollectionPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    query: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface QueryCollectionObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    query: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface AllowListPromiseChain{
    collection: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface AllowListObservableChain{
    collection: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CronTriggerPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    webhook: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    schedule: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Promise<(Scalars['JSONObject'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: FieldsSelection<Header, R>[]) => Promise<FieldsSelection<Header, R>[]>}),
    retry_conf: (RetryConfSTPromiseChain & {get: <R extends RetryConfSTRequest>(request: R, defaultValue?: (FieldsSelection<RetryConfST, R> | undefined)) => Promise<(FieldsSelection<RetryConfST, R> | undefined)>}),
    include_in_metadata: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface CronTriggerObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    webhook: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    schedule: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    payload: ({get: (request?: boolean|number, defaultValue?: (Scalars['JSONObject'] | undefined)) => Observable<(Scalars['JSONObject'] | undefined)>}),
    headers: ({get: <R extends HeaderRequest>(request: R, defaultValue?: FieldsSelection<Header, R>[]) => Observable<FieldsSelection<Header, R>[]>}),
    retry_conf: (RetryConfSTObservableChain & {get: <R extends RetryConfSTRequest>(request: R, defaultValue?: (FieldsSelection<RetryConfST, R> | undefined)) => Observable<(FieldsSelection<RetryConfST, R> | undefined)>}),
    include_in_metadata: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface RetryConfSTPromiseChain{
    num_retries: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    retry_interval_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    timeout_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    tolerance_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface RetryConfSTObservableChain{
    num_retries: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    retry_interval_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    timeout_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    tolerance_seconds: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}