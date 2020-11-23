import { everything, QueryResult } from "../generated-gql-client"

export const metadataSelectionSet = {
  metadata: {
    version: true,
    actions: {
      ...everything,
      permissions: everything,
      definition: {
        ...everything,
        arguments: everything,
        headers: {
          on_HeaderFromEnv: everything,
          on_HeaderFromValue: everything,
        },
      },
    },
    allowlist: everything,
    cron_triggers: {
      ...everything,
      retry_conf: everything,
      headers: {
        on_HeaderFromEnv: everything,
        on_HeaderFromValue: everything,
      },
    },
    custom_types: {
      enums: {
        ...everything,
        values: everything,
      },
      input_objects: {
        ...everything,
        fields: everything,
      },
      objects: {
        ...everything,
        fields: everything,
        relationships: {
          ...everything,
          remote_table: everything,
        },
      },
    },
    functions: {
      configuration: everything,
      function: everything,
    },
    query_collections: {
      ...everything,
      definition: { queries: everything },
    },
    remote_schemas: {
      ...everything,
      definition: {
        ...everything,
        headers: {
          on_HeaderFromEnv: everything,
          on_HeaderFromValue: everything,
        },
      },
    },
    tables: {
      ...everything,
      array_relationships: {
        ...everything,
        using: {
          foreign_key_constraint_on: {
            ...everything,
            table: everything,
          },
        },
      },
      computed_fields: {
        ...everything,
        definition: {
          ...everything,
          function: everything,
        },
      },
      configuration: {
        ...everything,
        custom_root_fields: everything,
      },
      delete_permissions: {
        ...everything,
        permission: everything,
      },
      // event_triggers: {
      //   ...everything,
      //   definition: {
      //     ...everything,
      //     delete: {
      //       // on_OperationSpecAllColumns: everything,
      //       on_OperationSpecIndividualColumns: everything,
      //     },
      //     insert: {
      //       // on_OperationSpecAllColumns: everything,
      //       on_OperationSpecIndividualColumns: everything,
      //     },
      //     update: {
      //       // on_OperationSpecAllColumns: everything,
      //       on_OperationSpecIndividualColumns: everything,
      //     },
      //   },
      //   headers: {
      //     on_HeaderFromEnv: everything,
      //     on_HeaderFromValue: everything,
      //   },
      //   retry_conf: everything,
      // },
      insert_permissions: {
        ...everything,
        permission: everything,
      },
      object_relationships: {
        ...everything,
        using: {
          foreign_key_constraint_on: true,
          manual_configuration: {
            column_mapping: true,
            remote_table: everything,
          },
        },
      },
      remote_relationships: {
        ...everything,
        definition: everything,
      },
      select_permissions: {
        ...everything,
        permission: everything,
      },
      table: everything,
      update_permissions: {
        ...everything,
        permission: everything,
      },
    },
  },
}

export const postgresSelectionSet = {
  postgres: {
    ...everything,
    schemas: {
      ...everything,
      tables: {
        ...everything,
        columns: everything,
        foreign_keys: everything,
        indexes: everything,
        primary_key: everything,
      },
    },
  },
}

export const metadataAndPostgresSelectionSet = {
  ...metadataSelectionSet,
  ...postgresSelectionSet,
}

export type MetadataQueryResult = QueryResult<typeof metadataSelectionSet>
export type PostgresQueryResult = QueryResult<typeof postgresSelectionSet>

export type MetadataAndPostgresQueryResult = QueryResult<
  typeof metadataAndPostgresSelectionSet
>
