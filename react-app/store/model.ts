import { action, thunk, computed } from "easy-peasy"
import type { Action, Thunk, Computed } from "easy-peasy"

import { client } from '../utils/graphqlClient'
import { getIntrospectionQuery, buildClientSchema, IntrospectionQuery, GraphQLSchema, print } from 'graphql'

import { metadataAndPostgresSelectionSet } from '../utils/querySelectionSets'
import type { MetadataAndPostgresQueryResult } from '../utils/querySelectionSets'

import { groupMetadataAndPostgresInfoByTableName } from './utils'
import type { GroupedMetadataAndPostgresTables } from './utils'

/**
 * =====================
 *  STORE TYPES
 * =====================
 */


export interface Store {
  search: string
  graphqlSchema: GraphQLSchema
  metadata: MetadataAndPostgresQueryResult['metadata']
  database: MetadataAndPostgresQueryResult['postgres']

  setGraphQLSchema: Action<Store, GraphQLSchema>
  setMetadata: Action<Store, MetadataAndPostgresQueryResult['metadata']>
  setDatabase: Action<Store, MetadataAndPostgresQueryResult['postgres']>

  loadMetadataAndDatabaseInfo: Thunk<Store>
  loadGraphQLSchemaByIntrospection: Thunk<Store>

  groupedMetadataAndDatabaseTables: Computed<Store, GroupedMetadataAndPostgresTables>
}

/**
 * =====================
 *  STORE MODEL
 * =====================
 */

const model: Store = {
  search: "",
  metadata: null,
  database: null,
  graphqlSchema: null,
  setMetadata: action((state, payload) => {
    state.metadata = payload
  }),
  setDatabase: action((state, payload) => {
    state.database = payload
  }),
  setGraphQLSchema: action((state, payload) => {
    state.graphqlSchema = payload
  }),
  loadMetadataAndDatabaseInfo: thunk(async (actions, _payload) => {
    const request = await client.query(metadataAndPostgresSelectionSet)
    actions.setMetadata(request.metadata)
    actions.setDatabase(request.postgres)
  }),
  loadGraphQLSchemaByIntrospection: thunk(async (actions, _payload) => {
    // TODO: Replace with dynamic value
    const request = await fetch('http://localhost:8085/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getIntrospectionQuery()
      })
    })
    const result = await request.json()
    const introspectionQuery: IntrospectionQuery = result.data
    const schema = buildClientSchema(introspectionQuery)
    console.log(print(schema.astNode))
    console.log('schema in store:', schema)
    actions.setGraphQLSchema(schema)
  }),
  groupedMetadataAndDatabaseTables: computed((state) => {
    return groupMetadataAndPostgresInfoByTableName({
      metadata: state.metadata,
      postgres: state.database
    })
  })
}

export default model
