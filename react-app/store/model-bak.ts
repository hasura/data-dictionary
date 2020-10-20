import { action, thunk } from "easy-peasy"
import type { Action, Thunk } from "easy-peasy"

import * as GQLTypes from "../generated-gql-client/schema"

import { client } from '../utils/graphqlClient'
import { everything } from "../generated-gql-client"

/**
 * =====================
 *  STORE TYPES
 * =====================
 */

export interface Store {
  metadata?: GQLTypes.HasuraMetadata
  database?: GQLTypes.Postgres

  setMetadata: Action<Store, GQLTypes.HasuraMetadata>
  setDatabase: Action<Store, GQLTypes.Postgres>

  loadMetadataAndDatabaseInfo: Thunk<Store>
}

/**
 * =====================
 *  STORE MODEL
 * =====================
 */

const model: Store = {
  metadata: null,
  database: null,
  setMetadata: action((state, payload) => {
    state.metadata = payload
  }),
  setDatabase: action((state, payload) => {
    state.database = payload
  }),
  loadMetadataAndDatabaseInfo: thunk(async (actions, _payload) => {
    const metadata = await client.chain.query.metadata.get({
      actions: {
        comment: true,
        definition: {
          handler: true,
          forward_client_headers: true,
          kind: true,
          output_type: true,
          type: true,
          arguments: {
            name: true,
            type: true
          },
          headers: {
            on_HeaderFromEnv: {
              name: true,
              value_from_env: true
            },
            on_HeaderFromValue: {
              name: true,
              value: true
            }
          },
        },
        name: true,
        permissions: {
          role: true
        }
      },
      allowlist: {
        collection: true
      },
      cron_triggers: {
        comment: true,
        headers: {
          on_HeaderFromEnv: {
            name: true,
            value_from_env: true,
          },
          on_HeaderFromValue: {
            name: true,
            value: true,
          }
        },
        include_in_metadata: true,
        name: true,
        payload: true,
        retry_conf: {
          num_retries: true,
          retry_interval_seconds: true,
          timeout_seconds: true,
          tolerance_seconds: true,
        },
        schedule: true,
        webhook: true,
      },
      custom_types: {
        enums: {
          description: true,
          name: true,
          values: {
            description: true,
            is_deprecated: true,
            value: true,
          },
        },
        input_objects: {
          description: true,
          fields: {
            description: true,
            name: true,
            type: true,
          },
          name: true,
        },
        objects: {
          description: true,
          fields: {
            description: true,
            name: true,
            type: true,
          },
          name: true,
          relationships: {
            field_mapping: true,
            name: true,
            remote_table: {
              name: true,
              schema: true,
            },
            type: true,
          },
        },
        scalars: {
          description: true,
          name: true,
        },
      },
      functions: {
        configuration: {
          session_argument: true,
        },
        function: {
          name: true,
          schema: true,
        },
      },
      query_collections: {
        comment: true,
        definition: {
          queries: {
            name: true,
            query: true,
          }
        },
        name: true,
      },
      remote_schemas: {
        comment: true,
        definition: {
          forward_client_headers: true,
          headers: {
            on_HeaderFromEnv: {
              name: true,
              value_from_env: true,
            },
            on_HeaderFromValue: {
              name: true,
              value: true,
            }
          },
          timeout_seconds: true,
          url: true,
          url_from_env: true,
        },
        name: true,
      },
      tables: {
        array_relationships: {
          comment: true,
          name: true,
          using: {
            foreign_key_constraint_on: {
              column: true,
              table: {
                name: true,
                schema: true,
              }
            }
          }
        },
        computed_fields: {
          comment: true,
          definition: {
            function: {
              name: true,
              schema: true,
            },
            session_argument: true,
            table_argument: true,
          },
          name: true,
        },
        configuration: {
          custom_column_names: true,
          custom_root_fields: {
            delete: true,
            delete_by_pk: true,
            insert: true,
            insert_one: true,
            select: true,
            select_aggregate: true,
            select_by_pk: true,
            update: true,
            update_by_pk: true,
          },
        },
        delete_permissions: {
          comment: true,
          permission: {
            filter: true,
          },
          role: true,
        },
        event_triggers: {
          definition: {
            enable_manual: true,
            delete: {
              columns: true,
              payload: true,
            },
            insert: {
              columns: true,
              payload: true,
            },
            update: {
              columns: true,
              payload: true,
            }
          },
          headers: {
            on_HeaderFromEnv: {
              name: true,
              value_from_env: true,
            },
            on_HeaderFromValue: {
              name: true,
              value: true,
            }
          },
          name: true,
          retry_conf: {
            interval_sec: true,
            num_retries: true,
            timeout_sec: true,
          },
          webhook: true,
          webhook_from_env: true,
        },
        insert_permissions: {
          comment: true,
          permission: {
            backend_only: true,
            check: true,
            columns: true,
            set: true,
          },
          role: true,
        },
        is_enum: true,
        object_relationships: {
          comment: true,
          name: true,
          using: {
            foreign_key_constraint_on: true,
            manual_configuration: {
              column_mapping: true,
              remote_table: {
                name: true,
                schema: true,
              },
            }
          }
        },
        remote_relationships: {
          name: true,
          definition: {
            hasura_fields: true,
            remote_field: true,
            remote_schema: true,
          },
        },
        select_permissions: {
          comment: true,
          permission: {
            allow_aggregations: true,
            columns: true,
            computed_fields: true,
            filter: true,
            limit: true,
          },
          role: true,
        },
        table: {
          name: true,
          schema: true,
        },
        update_permissions: {
          comment: true,
          permission: {
            check: true,
            columns: true,
            filter: true,
            set: true,
          },
          role: true,
        },
      },
      version: true
    }) as GQLTypes.HasuraMetadata 
    const database = await client.chain.query.postgres.get({ schemas: everything })
    actions.setMetadata(metadata)
    actions.setDatabase(database)
  }),
}

export default model
